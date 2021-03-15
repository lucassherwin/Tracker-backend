const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// request response and next function
// this will authenticate the user
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // get the authorization header
  // authorization === 'Bearer jwt'

  if(!authorization) // check if a vaild authorization was sent
  {
    return res.status(401).send({ error: 'You must be logged in' }); // if not return an error
  }

  // if we get to here the authorization must have been valid
  const token = authorization.replace('Bearer ', ''); // get the token
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if(err) // if there is an error return
    {
      return res.status(401).send({ error: 'You must be logged in' });
    }

    const { userID } = payload; // get the userID

    const user = await User.findById(userID); // find the user in the DB
    req.user = user;
    next();
  });
}