const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const apiResponse = require('../utils/apiResponse');
const { default: mongoose } = require('mongoose');

const createConversation = asyncHandler(async (req, res) => {
  const { members } = req.body;

  const conversation = await Conversation.create({ members });

  apiResponse(res, 201, 'OK', conversation);
});

// get all the conversations of users
const getConversationsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  const conversations = await Conversation.find({
    members: {
      $in: [userId],
    },
  });

  apiResponse(res, 200, 'OK', conversations);
});

module.exports = { createConversation, getConversationsByUserId };
