const express = require('express');
const {
  register,
  login,
  logout,
  refreshAccessToken,
  searchUsers,
} = require('../controllers/user.controller');
const { verifyJwt } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyJwt, logout);
router.post('/refresh-token', refreshAccessToken);
router.post('/search', searchUsers);

module.exports = router;
