const express = require('express');

const app = express(); // our application

// route
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>'); // response
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});