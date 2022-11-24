const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');

//connect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fieldlab"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
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

// dashboard page
app.get('/dashboard', function(req, res) {
  res.render('pages/dashboard');
});

//get css
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//check answers for video
app.post("/", function(req, res) {
  var userinput = req.body.answers;
  var answers = [];
  var response = [];

  con.query("SELECT correctAnswers FROM assignments WHERE id = 1", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].correctAnswers);
    console.log(userinput);

    answers = JSON.parse(result[0].correctAnswers);
    
    for(let i = 0; i < userinput.length; i++) {
      if(userinput[i] == answers[i]){
        response[i] = true;
      }else{
        response[i] = false;
      }
    }
    res.send(response);
  });
});

app.listen(8080);
console.log('Server is listening on port 8080');