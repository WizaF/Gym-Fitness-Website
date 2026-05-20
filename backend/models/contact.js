const moongoose = require('mongoose');

const contactSchema = moongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
});

// contactSchema.pre('save', function(next) {
//   console.log('Came to pre hook while saving a home');
//   this.name = this.name.toUpperCase();
//   next();
// });

module.exports = moongoose.model('Contact', contactSchema);

