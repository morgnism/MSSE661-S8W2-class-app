const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css')); // http://localhost:3000/css
app.use('/js', express.static(__dirname + '/public/src')); // http://localhost:3000/js

app.listen(3000, function() {
  console.log('Server started at http://localhost:%s', 3000);
});
