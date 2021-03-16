const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log(req.body); // gets the data sent in the post request {email password}
  
  const { email, password } = req.body; // get the email and password
  
  // error handling
  try {
    const user = new User({ email, password }); // create a new user
    await user.save(); // save user in mongoDB
    
    const token = jwt.sign({ userID: user._id }, 'MY_SECRET_KEY'); // generate the jwt token
    res.send({ token }); // send it back to the user

  } catch(err) {
    return res.status(422).send(err.message); // send invalid user request message (something wrong with email or password)
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) // if there is no email or password
  {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  // start log in process
  const user = await User.findOne({ email }); // find the user in the db by the email
  // user will be null if none is found with that email
  if(!user)
  {
    // 401 is forbidden
    return res.status(401).send({ error: 'Invalid email or password' });
  }

  try 
  {
    await user.comparePassword(password); // see if the passwords match
    const token = jwt.sign({ userID: user._id }, 'MY_SECRET_KEY'); // generate jwt
    res.send({ token }); // send the token back
  } 
  catch(err) // passwords don't match
  {
    // 401 is forbidden
    return res.status(401).send({ error: 'Invalid email or password' });
  }
})

module.exports = router;