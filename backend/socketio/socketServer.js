const cookieParser = require('cookie-parser');
const { saveMessage } = require('../controllers/message.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

let users = new Map();

const socketServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  let user;

  io.use(async (socket, next) => {
    cookieParser()(socket.request, socket.request.res, async () => {
      const token = socket.request?.cookies?.accessToken;
      if (token) {
        await verifyJwt(socket.request, socket.request.res, next);
        user = {
          _id: socket?.request?.user?._id?.toString(),
          email: socket?.request?.user?.email,
          username: socket?.request?.user?.username,
          socketId: socket.id,
        };
        console.log(user.email);
      } else {
        const err = new Error('not authorized');
        next(err);
      }
    });
  });

  io.on('connection', (socket) => {
    console.log(`connected: ${socket.id}`);

    socket.on('add-user', () => {
      !users.has(user?._id) && users.set(user?._id, user);
    });

    socket.on(
      'send-message',
      async ({ conversationId, senderId, receiverId, text }) => {
        const data = await saveMessage(conversationId, senderId, text); // save message to db
        if (data) {
          socket.emit('my-message', data); // send message back to the sender to display in ui

          const receiver = users.get(receiverId);

          receiver && io.to(receiver.socketId).emit('receive-message', data);
        }
      }
    );

    socket.on('typing', ({ receiverId, text }) => {
      io.to(users.get(receiverId)?.socketId).emit('start-typing', text);
    });

    socket.on('stop-typing', (receiverId) => {
      io.to(users.get(receiverId)?.socketId).emit('stop-typing');
    });

    socket.on('end', () => {
      console.log('disconnect');
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
      console.log(`disconnected: ${socket.id}`);
    });
  });
};

const findReceiver = (email) => users.get(email);

const removeUser = (id) =>
  users.forEach((value, key) => value?.socketId === id && users.delete(key));

module.exports = socketServer;
