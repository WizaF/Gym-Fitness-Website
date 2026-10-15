// routes/storeRouter.js

const express = require('express');
const StoreRouter = express.Router();

const { getPlans } = require('../controllers/paymentController');
const { getTweets } = require('../controllers/xTweetController');
const { getComments } = require('../controllers/YTCommentController');

StoreRouter.get('/plans', getPlans);
StoreRouter.get('/tweets', getTweets);
StoreRouter.get('/comments', getComments);

module.exports = StoreRouter;