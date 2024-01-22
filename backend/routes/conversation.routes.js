const { Router } = require('express');
const {
  createConversation,
  getConversationsByUserId,
} = require('../controllers/conversation.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

const router = Router();

router
  .route('/')
  .post(verifyJwt, createConversation)
  .get(verifyJwt, getConversationsByUserId);

module.exports = router;
