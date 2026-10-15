const mongoose = require("mongoose");

const PLAN_DETAILS = {
  Basic: {
    amount: 1500,
    duration: 1,
    image: "https://cdn.dribbble.com/users/427583/screenshots/16845776/media/36764a90470f33ffd77eb8843e9ea8f7.gif",
    introduction: 'The basic plan. Suitable for the people who are new to gym and wants to get started with it.',
  },

  Explorer: {
    amount: 4000,
    duration: 3,
    image: "https://cdn.dribbble.com/users/427583/screenshots/16845776/media/36764a90470f33ffd77eb8843e9ea8f7.gif",
    introduction: 'The explorer plan. Perfect for those who want to take their fitness to the next level.',
  },
  Advanced: {
    amount: 7500,
    duration: 6,
    image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Y4YTVyNWFtamh5ajhza2p5bWhrbmwyMnE3cnhoNjk0dzR4eGZ0OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/D9NnzMkyeWTdK/giphy.webp",
    introduction: 'The advanced plan. Ideal for dedicated individuals looking for a comprehensive fitness experience.',
  },
  Professional: {
    amount: 15000,
    duration: 12,
    image: "https://media.tenor.com/Knlx6SrXn6MAAAAM/fractal.gif",
    introduction: 'The professional plan. Designed for serious athletes and fitness enthusiasts.',
  },
};

const paymentSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  planType: {
    type: String,
    required: [true, "Plan type is required"],
    enum: ["Basic", "Explorer", "Advanced", "Professional"],
  },

  amount: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  introduction: {
    type: String,
  },
});

paymentSchema.pre("save", function (next) {
  const plan = PLAN_DETAILS[this.planType];
  this.amount = plan.amount;
  this.duration = plan.duration;
  this.image = plan.image;
  this.introduction = plan.introduction;
  // next();
});

module.exports = mongoose.model("Payment", paymentSchema);