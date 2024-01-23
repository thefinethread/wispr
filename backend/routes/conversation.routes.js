const { Router } = require('express');
const {
  createConversation,
  getConversation,
  getConversationsWithBasicInfo,
} = require('../controllers/conversation.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

const router = Router();

router
  .route('/')
  .post(verifyJwt, createConversation)
  .get(verifyJwt, getConversationsWithBasicInfo);

router.get('/:conversationId', verifyJwt, getConversation);

module.exports = router;
