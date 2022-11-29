const express = require("express")
  ,app = express()
  ,bodyParser = require("body-parser")
  ,mysql = require('mysql')
  , passport = require('passport')
  , MicrosoftStrategy = require('passport-microsoft').Strategy
  , morgan = require('morgan')
  , methodOverride = require('method-override')
  , session = require('express-session');

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


//+++++++++++++++++++LOGIN+++++++++++++++++++
var MICROSOFT_GRAPH_CLIENT_ID = '7a14dfa4-41c8-404e-8fcf-b1c818a37e1c';
var MICROSOFT_GRAPH_CLIENT_SECRET = 'XMY8Q~yAdofddTB1cV~8J46CS64EEC3xHSdrgcmz';

//passport setup
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//Setup microsoft login
passport.use(new MicrosoftStrategy({
  clientID: MICROSOFT_GRAPH_CLIENT_ID,
  clientSecret: MICROSOFT_GRAPH_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/microsoft/callback',
  scope: ['user.read']
},
function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    return done(null, profile);
  });
}
));

//app login require modules
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/dashboard', ensureAuthenticated, function (req, res) {
  res.render('pages/dashboard', { user: req.user });
});


// GET /auth/microsoft
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in Microsoft Graph authentication will involve
//   redirecting the user to the common Microsoft login endpoint. After authorization, Microsoft
//   will redirect the user back to this application at /auth/microsoft/callback
app.get('/auth/microsoft',
  passport.authenticate('microsoft', {
    // Optionally add any authentication params here
    // prompt: 'select_account'
  }),
  // eslint-disable-next-line no-unused-vars
  function (req, res) {
    // The request will be redirected to Microsoft for authentication, so this
    // function will not be called.
  });

// GET /auth/microsoft/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/dashboard');
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// index page
app.get('/', function(req, res) {
  res.render('pages/index', { user: req.user });
});

// opdracht page
app.get('/opdracht', function(req, res) {
  res.render('pages/opdracht');
});

// daschboard page
// app.get('/dashboard', function(req, res) {
//   res.render('pages/dashboard');
// });

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

//get assignment
app.post("/getAssignmentData",function(req, res) {
  var assignmentId = req.body.assignmentId;

  con.query("SELECT possibleAnswers FROM assignments WHERE id = " + assignmentId, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].possibleAnswers);
    console.log(assignmentId);

    possibleAnswers = JSON.parse(result[0].possibleAnswers);
    
    res.send(possibleAnswers);
  });
});


app.get('/auth/microsoft',
passport.authenticate('microsoft', {
  // Optionally define any authentication parameters here
  // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

  prompt: 'select_account',
}));

app.get('/auth/microsoft/callback', 
passport.authenticate('microsoft', { failureRedirect: '/?login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
});



app.listen(8080);
console.log('Server is listening on port 8080');