const mongoose = require("mongoose");

const XTweetSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  accent: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("XTweet", XTweetSchema);