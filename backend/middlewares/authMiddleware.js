const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyJwt = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    const decodedUser = jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      (err, tokenRes) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            res.status(401);
            throw new Error('Unauthorized - token is expired');
          } else {
            res.status(401);
            throw new Error('Unauthorized - ' + err.message);
          }
        }
        return tokenRes;
      }
    );

    const user = await User.findById(decodedUser?._id).select('-password');

    if (user) {
      req.user = user;
    } else {
      res.status(401);
      throw new Error('Unauthorized - User not found');
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized - No token');
  }

  next();
});

module.exports = { verifyJwt };
