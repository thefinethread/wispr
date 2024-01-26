const jwt = require('jsonwebtoken');

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

const generateAccessToken = (res, user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 1 * 60 * 60, // 5 minutes
    }
  );

  res.cookie('accessToken', token, {
    ...options,
    maxAge: 1 * 60 * 60 * 1000, // 5 minutes
  });
};

const generateRefreshToken = (res, user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  res.cookie('refreshToken', token, {
    ...options,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
