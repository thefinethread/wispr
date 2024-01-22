const { Router } = require('express');
const {
  saveMessage,
  getMessagesOfAConversation,
} = require('../controllers/message.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

const router = Router();

router
  .route('/')
  .post(verifyJwt, saveMessage)
  .get(verifyJwt, getMessagesOfAConversation);

module.exports = router;
