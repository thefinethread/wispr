const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const apiResponse = require('../utils/apiResponse');

/**
 * POST /api/users
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
    res.status(201).json(
      apiResponse('Success! Your account is now active.', {
        _id: user.id,
        username: user.username,
        email: user.email,
      })
    );
  } else {
    throw new Error('Something went wrong on our end');
  }
});

module.exports = { register };
