var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// opdracht page
app.get('/opdracht', function(req, res) {
  res.render('pages/opdracht');
});

//get css
app.use(express.static(__dirname + '/'));

//setup post
app.post("/", function(req, res) {
  res.send("nodejs - " + req.body);
});

app.listen(8080);
console.log('Server is listening on port 8080');