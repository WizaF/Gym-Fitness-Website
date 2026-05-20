// controllers/tweetController.js

const XTweet = require('../models/xTweet');

const getTweets = async (req, res) => {
  try {
    const tweets = await XTweet.find();

    res.status(200).json({
      success: true,
      data: tweets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getTweets };