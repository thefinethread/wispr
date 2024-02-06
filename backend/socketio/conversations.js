const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');

const getAllConversations = asyncHandler(async (_id, cb) => {
  const conversations = await Conversation.find({
    members: { $in: [_id] },
  })
    .populate('members', '_id username email profilePhoto online')
    .populate({
      path: 'messages',
      options: { limit: 1, sort: { createdAt: -1 } },
      select: '_id text sender createdAt',
    })
    .sort({ updatedAt: -1 });
  console.log(conversations);
  cb(conversations);
});

module.exports = { getAllConversations };
