const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', (req, res) => {
  console.log(req.body); // gets the data sent in the post request
  res.send('You made a post request');
});

module.exports = router;