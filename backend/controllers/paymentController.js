// controllers/paymentController.js

const Payment = require('../models/Payment');

const getPlans = async (req, res) => {
  try {
    const plans = await Payment.find();

    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getPlans };