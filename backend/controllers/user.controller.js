const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
  res.json('welcome');
});

module.exports = { register };
