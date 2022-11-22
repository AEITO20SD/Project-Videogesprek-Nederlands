const express = require("express");
var app = express();
const bodyParser = require("body-parser")

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup post
app.post("/", function(req, res) {
  console.log(req.body.answers);
  res.send(req.body);
});

app.listen(8080);
console.log('Server is listening on port 8080');