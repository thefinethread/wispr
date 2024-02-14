const { default: mongoose } = require('mongoose');
const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');

const getAllConversations = asyncHandler(async (_id, cb) => {
  const conversations = await Conversation.aggregate([
    { $unwind: '$members' },
    { $match: { 'members.userId': { $ne: new mongoose.Types.ObjectId(_id) } } },
    {
      $lookup: {
        from: 'users',
        localField: 'members.userId',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    { $unwind: '$userDetails' },
    {
      $group: {
        _id: '$_id',
        members: {
          $push: {
            _id: '$userDetails._id',
            username: '$userDetails.username',
            email: '$userDetails.email',
            online: '$userDetails.online',
            profilePhoto: '$userDetails.profilePhoto',
            lastViewed: '$members.lastViewed',
          },
        },
        messages: { $first: '$messages' },
      },
    },
    {
      $lookup: {
        from: 'messages',
        localField: 'messages',
        foreignField: '_id',
        as: 'messages',
        pipeline: [
          { $sort: { createdAt: -1 } },
          { $limit: 6 },
          {
            $project: {
              conversationId: 0,
              updatedAt: 0,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        otherMember: { $arrayElemAt: ['$members', 0] },
        messages: '$messages',
      },
    },
  ]);

  const count = (messages, lastViewed) => {
    /**
     * counting unread messages from the logic that lastViewed time should be
     * less than message.createdAt time for new messages,
     * then only returning max 5 unread messages if there are any and also the last message details
     *  */
    const msgCount = messages.reduce(
      (acc, curr) => (curr.createdAt > lastViewed ? acc + 1 : acc),
      0
    );
    return {
      unreadMessageCount: msgCount > 5 ? '5+' : msgCount.toString(),
      lastMessage: messages[0],
    };
  };

  const list = conversations.map((conversation) => ({
    ...conversation,
    messages: count(conversation.messages, conversation.otherMember.lastViewed),
  }));

  cb(list);
});

module.exports = { getAllConversations };
