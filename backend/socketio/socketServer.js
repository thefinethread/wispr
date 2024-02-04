const cookieParser = require('cookie-parser');
const { saveMessage } = require('../controllers/message.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const { sendMessage, getMessages } = require('./messages');
const { getAllConversations } = require('./conversations');
const { updateSocketIdAndOnlineStatus } = require('./users');

let users = new Map();

const socketServer = (server) => {
  let currentUser;

  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3005',
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    cookieParser()(socket.request, socket.request.res, async () => {
      const token = socket.request?.cookies?.accessToken;
      if (token) {
        await verifyJwt(socket.request, socket.request.res, next);
        currentUser = {
          _id: socket?.request?.user?._id?.toString(),
          email: socket?.request?.user?.email,
          username: socket?.request?.user?.username,
          socketId: socket.id,
        };
      } else {
        const err = new Error('not authorized');
        next(err);
      }
    });
  });

  io.on('connection', async (socket) => {
    console.log(`connected: ${socket.id}`);

    // updated socket id & online status to db of the connected user and broadcast status
    updateSocketIdAndOnlineStatus(
      { _id: currentUser?._id, online: true, socketId: currentUser?.socketId },
      socket
    );

    socket.on(
      'update-user-profile',
      async ({ userId, fieldName, fieldValue }, cb) => {
        const res = await User.findByIdAndUpdate(
          userId,
          { [fieldName]: fieldValue },
          { new: true }
        ).select(`${fieldName}`);

        // send acknowledgment to current user
        cb(res);
        // emit event to other clients
        socket.broadcast.emit('other-user-profile-updated', res);
      }
    );

    // get all conversations
    socket.on('all-conversations', getAllConversations);

    // get latest messages for a conversation
    socket.on('get-messages', getMessages);

    // send message
    socket.on('send-message', (data, cb) => sendMessage({ ...data }, cb, io));

    socket.on('typing', ({ receiverId, senderId, text }) => {
      io.to(users.get(receiverId)?.socketId).emit('start-typing', {
        senderId,
        text,
      });
    });

    socket.on('stop-typing', ({ senderId, receiverId }) => {
      io.to(users.get(receiverId)?.socketId).emit('stop-typing', { senderId });
    });

    // socket.on('end', () => {
    //   console.log('disconnect');
    //   socket.disconnect();
    // });

    socket.on('disconnect', async () => {
      console.log(`disconnected: ${socket.id}`);

      updateSocketIdAndOnlineStatus(
        {
          socketId: socket.id,
          online: false,
        },
        socket
      );
    });
  });

  return { io };
};

module.exports = socketServer;
