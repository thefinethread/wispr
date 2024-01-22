const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const apiResponse = require('../utils/apiResponse');
const { default: mongoose } = require('mongoose');
const { SERVER_ERROR } = require('../constants/commonMessages');

/**
 * Desc - get all the messages of a conversation
 * api - GET /api/messages
 * params - conversationId
 * private
 */
const getMessagesOfAConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.query;

  if (!conversationId) {
    res.status(400);
    throw new Error('conversationId is required');
  }

  const messages = await Message.aggregate([
    {
      $match: {
        conversation: new mongoose.Types.ObjectId(conversationId),
      },
    },
    {
      $lookup: {
        from: 'conversations', // getting the conversation info for checking if the user is a member of the conversation
        localField: 'conversation',
        foreignField: '_id',
        as: 'conversationInfo',
      },
    },
    {
      $match: {
        'conversationInfo.members': new mongoose.Types.ObjectId(req?.user?._id),
      },
    },
    {
      $sort: {
        createdAt: -1, // sorting messages in desc order of time
      },
    },
    {
      $project: {
        conversationInfo: 0,
      },
    },
  ]);

  if (messages) {
    apiResponse(res, 200, 'OK', messages);
  } else {
    throw new Error(SERVER_ERROR);
  }
});

/**
 * Desc - save new message to the conversation
 * api - POST /api/messages
 * private
 */
const saveMessage = asyncHandler(async (req, res) => {
  const { conversation, text } = req.body;

  if (!conversation || !text) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const message = await Message.create({
    conversation,
    text,
    sender: req?.user?._id,
  });

  if (message) {
    apiResponse(res, 200, 'OK', message);
  } else {
    throw new Error(SERVER_ERROR);
  }
});

module.exports = { saveMessage, getMessagesOfAConversation };
