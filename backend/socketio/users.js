const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const updateSocketIdAndOnlineStatus = asyncHandler(
  async ({ _id, socketId, online }, socket) => {
    const user = await User.findOneAndUpdate(
      { $or: [{ _id }, { socketId }] },
      { online, socketId },
      { new: true }
    );

    // broadcast online status
    socket.broadcast.emit('active-status', {
      _id: user?._id,
      online: user?.online,
    });
  }
);

module.exports = { updateSocketIdAndOnlineStatus };
