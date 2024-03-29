const { saveMessage } = require('../controllers/message.controller');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getMessages = asyncHandler(async ({ conversationId }, cb) => {
  const data = await Message.find({ conversationId }).select(
    '_id text senderId createdAt updatedAt'
  );
  cb(data);
});

const sendMessage = asyncHandler(
  async ({ conversationId, senderId, receiverId, text }, cb, io) => {
    if (!text) return;

    let newChat = false;

    if (!conversationId) {
      const conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
      newChat = true;
      conversationId = conversation._id;
    }

    // save message to Message collection
    const message = await Message.create({
      conversationId,
      text,
      senderId,
    });

    if (message) {
      // update new message id to Conversation collection
      await Conversation.findByIdAndUpdate(conversationId, {
        $push: { messages: message._id },
      });

      const receiver = await User.findById(receiverId);

      // emit event to receiver
      io.to(receiver.socketId).emit('receive-message', { message, newChat });
      // sending acknowledgment to sender
      cb({ message, newChat });
    } else {
      throw new Error(SERVER_ERROR);
    }
  }
);

module.exports = { sendMessage, getMessages };
