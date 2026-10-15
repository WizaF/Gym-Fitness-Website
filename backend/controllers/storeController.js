// routes/storeRouter.js

const express = require('express');
const StoreRouter = express.Router();

const { getPlans } = require('../controllers/paymentController');

StoreRouter.get('/plans', getPlans);

module.exports = StoreRouter;