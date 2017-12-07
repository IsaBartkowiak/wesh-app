// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var models = require('./models/index');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session');




// *** routes *** //
var routes = require('./routes/index.js');

// *** express instance *** //
var app = express();
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };

// *** static directory *** //
app.set('views', path.join(__dirname, 'views/'));
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/bower_components',  express.static('./bower_components'));



// *** config middleware *** //
//app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser('lorem'));

app.use(session({
    secret:'lorem',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// *** authentification *** //
passport.use(new Strategy({ usernameField: 'email', passwordField: 'password' },
  function(email, password, done) {
    models.User.find({
      where:{
        email: email
      }
    }).then(function(user) {
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
    .catch(function (err) {
      return done(null, false);
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.find({
    where:{
      id: id,
    },
    attributes: { exclude: ['password'] }
  }).then(function(user){
    done(null, user);
  }).catch(function(err){
    done(err);
  });
});


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// *** main routes *** //
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err.status);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err.status);
});


module.exports = app;
