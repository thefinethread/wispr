const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const apiResponse = require('../utils/apiResponse');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken');

const generateTokens = asyncHandler(async (res, user) => {
  generateAccessToken(res, user);
  const refreshToken = generateRefreshToken(res, user);

  await User.findByIdAndUpdate(user._id, {
    refreshToken,
  });
});

/**
 * POST /api/users/register
 * public
 * create new user
 */
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please enter all the fields');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error(
      'This email is already registered. Please log in or use a different email.'
    );
  }

  const user = await User.create({ username, email, password });

  generateAccessToken(res, user);
  generateRefreshToken(res, user);

  if (user) {
    apiResponse(res, 201, 'Success! Your account is now active.', {
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    throw new Error('Something went wrong on our end');
  }
});

/**
 * POST /api/users/login
 * login user
 * public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('email or password is missing');
  }

  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await user.validatePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  await generateTokens(res, user);

  apiResponse(res, 200, `Welcome back! You're now logged in.`, {
    _id: user.id,
    username: user.username,
    email: user.email,
  });
});

module.exports = { register, login };
