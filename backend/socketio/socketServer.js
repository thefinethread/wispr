let activeUsers = [];

const socketServer = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    socket.on('add-new-user', (userId) => {
      addNewUser(userId, socket.id);
      io.emit('get-active-users', activeUsers);
    });

    socket.on('send-message', (data) => {
      const { receiverId } = data;
      const receiver = activeUsers.find((user) => user.userId === receiverId);
      receiver && io.to(receiver.socketId).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
      removeActiveUser(socket.id);
      io.emit('get-active-users', activeUsers);
    });
  });
};

const addNewUser = (userId, socketId) => {
  !activeUsers.some((user) => user.userId === userId) &&
    activeUsers.push({ userId, socketId });
};

const removeActiveUser = (socketId) => {
  activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
};

module.exports = socketServer;
