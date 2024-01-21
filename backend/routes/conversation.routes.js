const { Router } = require('express');
const {
  createConversation,
  getConversationsByUserId,
} = require('../controllers/conversation.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/', createConversation);
router.get('/', getConversationsByUserId);

module.exports = router;
