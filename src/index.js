require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const app = express(); // our application
app.use(bodyParser.json()); // parse json
app.use(authRoutes); // then request handler

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
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>'); // response
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});