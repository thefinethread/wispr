const { saveMessage } = require('../controllers/message.controller');

let users = new Map();

const socketServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`connected ${socket.id}`);

    socket.on('add-user', (data) => addUser(data));

    socket.on(
      'send-message',
      async ({ conversationId, senderId, receiverEmail, text }) => {
        const data = await saveMessage(conversationId, senderId, text);
        if (data) {
          socket.emit('my-message', data);

          if (findReceiver(receiverEmail))
            io.to(findReceiver(receiverEmail).socketId).emit(
              'receive-message',
              data
            );
        }
      }
    );

    socket.on('typing', ({ senderId, receiverEmail, text }) => {
      console.log(senderId, receiverEmail);
      io.to(findReceiver(receiverEmail)?.socketId).emit(
        'typing-response',
        text
      );
    });

    socket.on('stop-typing', ({ senderId, receiverEmail }) => {
      io.to(findReceiver(receiverEmail)?.socketId).emit('stop-typing');
    });

    socket.on('disconnect', () => removeUser(socket.id));
  });
};

const findReceiver = (email) => users.get(email);

const addUser = (data) =>
  !users.has(data?.email) && users.set(data?.email, data);

const removeUser = (id) =>
  users.forEach((value, key) => value?.socketId === id && users.delete(key));

module.exports = socketServer;
