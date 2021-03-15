const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log(req.body); // gets the data sent in the post request {email password}
  
  const { email, password } = req.body; // get the email and password
  const user = new User({ email, password }); // create a new user
  await user.save(); // save user in mongoDB

  res.send('You made a post request');
});

module.exports = router;