const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        lastViewed: { type: Date, default: mongoose.now() },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
