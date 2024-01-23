const { Router } = require('express');
const {
  createConversation,
  getConversationsByUserId,
  getConversationsWithBasicInfo,
} = require('../controllers/conversation.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

const router = Router();

router
  .route('/')
  .post(verifyJwt, createConversation)
  .get(verifyJwt, getConversationsWithBasicInfo);

module.exports = router;
