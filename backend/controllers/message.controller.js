const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const apiResponse = require('../utils/apiResponse');

const getMessages = asyncHandler(async (req, res) => {});

const saveMessage = asyncHandler(async (req, res) => {
  const { chat, text, sender } = req.body;

  const message = await Message.create({ chat, text, sender });

  apiResponse(res, 200, 'OK', message);
});

module.exports = { saveMessage, getMessages };
