const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const apiResponse = require('../utils/apiResponse');
const { SERVER_ERROR } = require('../constants/commonMessages');
const { default: mongoose } = require('mongoose');

/**
 * Desc - create new conversation
 * api - POST /api/conversations
 * private
 */
const createConversation = asyncHandler(async (req, res) => {
  const { members } = req.body;

  if (members?.length < 2) {
    res.status(400);
    throw new Error('At least two members are required');
  }

  const conversation = await Conversation.create({
    members: [...members, req?.user?._id],
  });

  if (conversation) {
    apiResponse(res, 200, 'OK', conversation);
  } else {
    throw new Error(SERVER_ERROR);
  }
});

/**
 * Desc - get conversation info
 * api - GET /api/conversations/:conversationId
 * private
 */
const getConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const conversations = await Conversation.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(conversationId),
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { members: '$members' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ['$_id', '$$members'] },
                  { $ne: ['$_id', req?.user?._id] },
                ],
              },
            },
          },
          {
            $project: {
              username: 1,
              profilePhoto: 1,
              email: 1,
            },
          },
        ],
        as: 'members',
      },
    },
  ]);

  if (conversations) {
    apiResponse(res, 200, 'OK', conversations?.[0]);
  } else {
    throw new Error(SERVER_ERROR);
  }
});

/**
 * Desc - get all the conversations of users
 * api - GET /api/conversations
 * private
 */
const getConversationsWithBasicInfo = asyncHandler(async (req, res) => {
  const conversations = await Conversation.aggregate([
    {
      $match: {
        members: req?.user?._id,
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { members: '$members' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ['$_id', '$$members'] },
                  { $ne: ['$_id', req?.user?._id] },
                ],
              },
            },
          },
          {
            $project: {
              password: 0,
              createdAt: 0,
              updatedAt: 0,
              refreshToken: 0,
            },
          },
        ],
        as: 'members',
      },
    },
    {
      $lookup: {
        from: 'messages',
        let: { conversationId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$conversation', '$$conversationId'],
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $limit: 1,
          },
          {
            $project: {
              conversation: 0,
            },
          },
        ],
        as: 'lastMessage',
      },
    },
    {
      $addFields: {
        lastMessage: {
          $arrayElemAt: ['$lastMessage', 0],
        },
      },
    },
  ]);

  apiResponse(res, 200, 'OK', conversations);
});

module.exports = {
  createConversation,
  getConversation,
  getConversationsWithBasicInfo,
};
