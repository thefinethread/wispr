const express = require('express');
const {
  register,
  login,
  logout,
  refreshAccessToken,
} = require('../controllers/user.controller');
const {
  verifyJwt,
  verifyRefreshToken,
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyJwt, logout);
router.post('/refresh-token', verifyRefreshToken, refreshAccessToken);

module.exports = router;
