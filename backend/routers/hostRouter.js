const express = require('express');
const hostRouter = express.Router();

const Payment = require('../models/Payment');
const XTweet = require('../models/xTweet');
const YTComment = require('../models/YTComment');


// hostRouter.get('/seed-comments', async (req, res) => {

//   try {

//     await YTComment.create({
//       name: 'John Cena',
//       comment: 'Bruh I can SEE this site is crazy!',
//       likes: 342
//     })
//     await YTComment.create({
//       name: 'Saket Gokhale',
//       comment: 'You are my inspiration, I am so proud of you.',
//       likes: 45
//     })
//     await YTComment.create({
//       name: 'Elon Musk',
//       comment: 'Dude I will use this in Mars',
//       likes: 45
//     })

//     res.send('Comments inserted');
//   }

//   catch (error) {

//     console.log(error);

//     res.send(error.message);

//   }

// });


module.exports = hostRouter;