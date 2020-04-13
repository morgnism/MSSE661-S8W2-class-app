const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css')); // http://localhost:3000/css
app.use('/js', express.static(__dirname + '/public/src')); // http://localhost:3000/js

app.listen(port, function() {
  console.log('Server started at http://localhost:%s', port);
});
