const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
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

  if (user) {
    await generateTokens(res, user);

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

  if (!user || !(await user.validatePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  await generateTokens(res, user);

  apiResponse(res, 200, `Welcome back! You're now logged in.`, {
    _id: user.id,
    username: user.username,
    email: user.email,
    profilePhoto: user.profilePhoto,
  });
});

/**
 * POST /api/users/logout
 * logout user
 * private
 */
const logout = asyncHandler(async (req, res) => {
  // clear cookies
  res.clearCookie('accessToken').clearCookie('refreshToken');

  // remove refresh token from db
  await User.updateOne({ _id: req.user._id }, { $unset: { refreshToken: 1 } });

  apiResponse(res, 200, 'Logged out successfully');
});

/**
 * POST /api/users/refresh-token
 * refresh the access token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error('Unauthorized - no refresh token');
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_SECRET,
    (err, tokenRes) => {
      if (err) {
        res.status(401);

        throw err.name === 'TokenExpiredError'
          ? new Error('Unauthorized - refresh token is expired')
          : new Error('Unauthorized - ' + err.message);
      }
      return tokenRes;
    }
  );

  const user = await User.findById(decoded?._id).select('-password');

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized - user not found');
  }

  if (user?.refreshToken === refreshToken) {
    generateAccessToken(res, user);
    apiResponse(res, 200, 'Access token refreshed');
  } else {
    res.status(401);
    throw new Error('Unauthorized - invalid refresh token');
  }
});

/**
 * POST /api/users/search
 * get users
 * private
 */
const searchUsers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.status(400);
    throw new Error(`searchQuery('q') is required`);
  }

  if (q?.trim()?.length < 3) {
    res.status(400);
    throw new Error('Please enter at least 3 characters');
  }

  const data = await User.find({
    $and: [
      {
        _id: { $ne: req.user._id },
      },
      {
        $or: [
          {
            username: { $regex: q, $options: 'i' },
          },
          {
            email: { $regex: q, $options: 'i' },
          },
        ],
      },
    ],
  }).select('_id username email profilePhoto online');

  apiResponse(res, 200, 'OK', data);
});

module.exports = { register, login, logout, refreshAccessToken, searchUsers };
