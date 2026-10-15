// controllers/CommentController.js

const YTComment = require('../models/YTComment');

const getComments = async (req, res) => {
  try {
    const comments = await YTComment.find();

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getComments };