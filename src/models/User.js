const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// pre save hook
// will run before we save a user in the DB
userSchema.pre('save', function(next) { // we use 'function()' so we have access to 'this' which contains the user
  const user = this;

  // if the user did not modify their password
  if(!user.isModified('password'))
  {
    return next(); // move on don't salt
  }

  // otherwise generate the salt and hash it
  // 10 refers to the complexity of the salt
  bcrypt.genSalt(10, (err, salt) => {
    if(err) // if there is an error stop
    {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err)
      {
        return next(err);
      }
      user.password = hash; // replace password with salted/hashed password
      next();
    })
  })
});

// check password
userSchema.methods.comparePassword = function(candidatePassword) { // use 'function()' because 'this' will be the user we are operating on
  const user = this;  

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if(err) // check if there is an error
      {
        return reject(err);
      }

      if(!isMatch) // check if the passwords are a mathc
      {
        return reject(false); // if not it is false
      }

      resolve(true);
    });
  });
}

mongoose.model('User', userSchema);