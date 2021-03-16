const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // tells mongoDB that this points to a User model
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema] // array of locations
});

// not doing pointSchema because we don't want a collection of pointSchemas in the DB
// the points are embedded in the trackSchema
mongoose.model('Track', trackSchema); 