const { compareSync } = require("bcryptjs");
const { request } = require("express");

const express = require("express")
  ,app = express()
  ,bodyParser = require("body-parser")
  ,mysql = require('mysql')
  ,config = require('./config.json');
  // , passport = require('passport')
  // , MicrosoftStrategy = require('passport-microsoft').Strategy
  // , morgan = require('morgan')
  // , methodOverride = require('method-override')
  // , session = require('express-session');

//connect to database
const connectionPool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  timeout: config.database.timeout,
  timezone: "UTC",
  multipleStatements: true,
  connectionLimit: 5
});

connectionPool.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file


// //+++++++++++++++++++LOGIN+++++++++++++++++++
// var MICROSOFT_GRAPH_CLIENT_ID = '7a14dfa4-41c8-404e-8fcf-b1c818a37e1c';
// var MICROSOFT_GRAPH_CLIENT_SECRET = 'XMY8Q~yAdofddTB1cV~8J46CS64EEC3xHSdrgcmz';

// //passport setup
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// //Setup microsoft login
// passport.use(new MicrosoftStrategy({
//   clientID: MICROSOFT_GRAPH_CLIENT_ID,
//   clientSecret: MICROSOFT_GRAPH_CLIENT_SECRET,
//   callbackURL: 'http://localhost:8080/auth/microsoft/callback',
//   scope: ['user.read']
// },
// function (accessToken, refreshToken, profile, done) {
//   // asynchronous verification, for effect...
//   process.nextTick(function () {
//     return done(null, profile);
//   });
// }
// ));

// //app login require modules
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(session({ 
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));

// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/dashboard', ensureAuthenticated, function (req, res) {
//   res.render('pages/dashboard', { user: req.user });
// });


// // GET /auth/microsoft
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request. The first step in Microsoft Graph authentication will involve
// //   redirecting the user to the common Microsoft login endpoint. After authorization, Microsoft
// //   will redirect the user back to this application at /auth/microsoft/callback
// app.get('/auth/microsoft',
//   passport.authenticate('microsoft', {
//     // Optionally add any authentication params here
//     // prompt: 'select_account'
//   }),
//   // eslint-disable-next-line no-unused-vars
//   function (req, res) {
//     // The request will be redirected to Microsoft for authentication, so this
//     // function will not be called.
//   });

// // GET /auth/microsoft/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// app.get('/auth/microsoft/callback',
//   passport.authenticate('microsoft', { failureRedirect: '/login' }),
//   function (req, res) {
//     res.redirect('/dashboard');
//   });

// app.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// });

// // Simple route middleware to ensure user is authenticated.
// //   Use this route middleware on any resource that needs to be protected.  If
// //   the request is authenticated (typically via a persistent login session),
// //   the request will proceed.  Otherwise, the user will be redirected to the
// //   login page.
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login');
// }

// index page


app.get('/',function(req,res){
  res.render('pages/index',{error: false});
});

// opdracht page
app.get('/opdracht', function(req, res) {
  res.render('pages/opdracht');
});

// login pagina
app.get('/login', function(req, res) {
  res.render('pages/login');
});

// daschboard page
app.get('/dashboard', async function(req, res) {
  await connectionPool.query('SELECT id,name FROM assignment', function(err, result){
    // ...
    var data = JSON.stringify(result);
    console.log({items: data});
    res.render('pages/dashboard', {items: data});
});


});

//get css
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/create-room',async function(req, res){
  var assignmentId = req.body.assignmentId;
  console.log(req.body);
  var code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  console.log(code);
  try{
    await connectionPool.query('INSERT INTO `room` (`id`, `token`, `startTime`, `endTime`, `ownerId`, `assignmentId`) VALUES (NULL, ' + code + ', NOW(), DATE_ADD(NOW() , INTERVAL 1 HOUR) , 2, '+ req.body.assignmentId +');', function(err, result){
      res.send({roomcode: code});
    });
  }catch(e){
    console.log(e);
    res.send({error: true, message: e});
  }
  
});

//check answers for video
app.post("/", async function(req, res) {
  var request = req.body;

  try{
    const data = await asyncQuery("SELECT `order`, videoId FROM `assignment_has_video` WHERE assignmentId = "+ request.assignmentId);
    if (data.length === 0){
      res.send({error:true, message: "Er is een onbekende fout opgetreden bij het nakijken van de opdracht. Probeer het later opnieuw!"})
    }else{
      var response = [];
      
      for (let i = 0; i < data.length; i++) {
        console.log(request.answers);
        console.log(data[i]);
          if(request.answers[i] == data[i].videoId){
            response[i] = true;
          }else{
            response[i] = false;
          }
      }
      res.send(response);
    }
  }catch(e){
    console.log(e);
    res.send({error: true, message: e})
  }
  
});

//get assignment
app.post("/getAssignmentData",function(req, res) {
  var assignmentId = req.body.assignmentId;

  connectionPool.query("SELECT possibleAnswers FROM assignments WHERE id = " + assignmentId, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].possibleAnswers);
    console.log(assignmentId);

    possibleAnswers = JSON.parse(result[0].possibleAnswers);
    
    res.send(possibleAnswers);
  });
});


// app.get('/auth/microsoft',
// passport.authenticate('microsoft', {
//   // Optionally define any authentication parameters here
//   // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

//   prompt: 'select_account',
// }));

// app.get('/auth/microsoft/callback', 
// passport.authenticate('microsoft', { failureRedirect: '/?login' }),
// function(req, res) {
//   // Successful authentication, redirect home.
//   res.redirect('/dashboard');
// });

async function asyncQuery(query, values) {
  return new Promise(function(resolve, reject) {
      connectionPool.getConnection(function (error, connection) {
          if (error) {
              reject(error);
  
              return;
          }
  
          connection.query({
              sql: query,
              values: values
          }, function (error, results) {
              if (error) {
                  reject(error);
              }
              else {
                  resolve(results);
              }
  
              connection.release();
          });
      });
  });
}

//room
app.get('/:roomcode',async function(req, res) {
  if(req.params.roomcode.length >= 0){
    try{
      //get data assignment data from database
      const data = await asyncQuery('SELECT assignment.id, assignment.name, assignment.description, video.id, video.url, room.endTime FROM ((room INNER JOIN assignment ON room.assignmentId = assignment.id) INNER JOIN video ON room.assignmentId = video.assignmentId) WHERE room.token = ?', req.params.roomcode);
      
      //if is no data or the data.endtime is expired then render start page with error
      if (data.length === 0 || data[0].endTime < Date.now()){
        res.render('pages/index',{error: true, message: "Roomcode niet gevonden of is verlopen!"});
      }else {
        //minify json
        var i = 0;
        var resendData = {name: null, description: null, videos:[null]};

        resendData.id = data[0].id;
        resendData.name = data[0].name;
        resendData.description = data[0].description;
        data.forEach(element =>{
           resendData.videos[i] = {id: element.id, url: element.url};
           i++
        });

        //render assignment(opdracht.ejs) with minifyed JSON
        res.render('pages/opdracht', resendData);
      }
    }
    //if there is an error with getting the data from the database then render index with error message
    catch(e){
      res.render('pages/index', {error: true, message: e})
    }
    //if there is no roomcode in url render index without any error or json data
  }else{
    res.render('pages/index');
  }
});

//get assignment
app.post("/deleteAssignment",async function(req, res) {
    try{
      const data = await asyncQuery('DELETE FROM assignment WHERE id = ?', req.body.assignmentId);
      if (data.length === 0){
        res.send({error: true, message: "Kon opdracht niet verwijderen..."})
      }else{
        res.status(200).send({error: false});
      }
    }
    catch(e){
      
      res.send({error: true, message: JSON.stringify(e)})
    }
});

// login submission routing
app.post('/login',(req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  
// database connectie voor het ophalen van de gebruikersnaam
const query = `SELECT * FROM docent WHERE emailAddress = '${username}'`;
connectionPool.query(query, (error, result) => {
  if (error) {
    // If there is an error, redirect the user to the error page
    res.redirect('pages/login');
  } else {
    // If the query is successful, compare the user's password to the hashed password in the database
    const user = result[0];
    if (password === user.password) {
      // If the passwords match, redirect the user to the home page
      res.redirect('/dashboard');
    } else {
      // If the passwords do not match, redirect the user to the login page with an error message
      res.render('pages/login', {error: true, message: 'error'})

    }
  }
});
});


app.listen(8080);
console.log('Server is listening on port 8080');