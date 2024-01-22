const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const apiResponse = require('../utils/apiResponse');
const { SERVER_ERROR } = require('../constants/commonMessages');

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
 * Desc - get all the conversations of users
 * api - GET /api/conversations
 * private
 */
const getConversationsByUserId = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    members: { $in: [req?.user?._id] },
  });

  if (conversations) {
    apiResponse(res, 200, 'OK', conversations);
  } else {
    throw new Error(SERVER_ERROR);
  }
});

module.exports = { createConversation, getConversationsByUserId };
