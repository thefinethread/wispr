const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Message', messageSchema);

module.exports = Chat;
