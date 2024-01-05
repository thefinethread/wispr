const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      trim: true,
    },
    profilePhoto: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
