import { query } from 'express';
import Chat from '../models/Chat';

const authenticateChatMembership = async (req, res, next) => {
  const { chatId } = req.params;
  const { memberId } = query();

  const chat = await Chat.findById(chatId);

  if (chat) {
    const isMember = chat?.members.includes(memberId);

    if (isMember) {
      req.chat = chat;
    } else {
      res.status(403);
      throw new Error('Access Denied. User is not a member of the chat.');
    }
  } else {
    res.status(404);
    throw new Error('Conversation not found.');
  }
  next();
};

module.exports = { authenticateChatMembership };
