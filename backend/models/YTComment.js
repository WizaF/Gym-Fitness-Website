const mongoose = require('mongoose');

const YTCommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('YTComment', YTCommentSchema);
