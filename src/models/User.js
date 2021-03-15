const mongoose = require('mongoose');

// define a user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // makes sure that every email is unique
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('User', userSchema);