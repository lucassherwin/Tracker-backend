// 'npm run dev' to run
require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express(); // our application
app.use(bodyParser.json()); // parse json
app.use(authRoutes); // then request handler
app.use(trackRoutes);

// from mongoDB
const mongoUri = 'mongodb+srv://admin:adminPassword@cluster0.0wgoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// connect to mongoDB 
// pass in uri and options object
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

// route
// when a request is received:
  // first run the middleware -- make sure the user provided a valid jwt
  // if they did we allow them to access the route
app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`); // response
});

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });