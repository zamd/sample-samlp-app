const express = require('express'),
      session = require('express-session'),
      passport =require('passport'),
      path = require('path'),
      logger = require('morgan'),
      dotenv = require('dotenv'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

dotenv.load();

const profile = require('./routes/profile'),
      samlp = require('./routes/samlp');

require('./passport-setup');



var app = express();

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret1001'
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/login');
});

app.use('/saml_login/',samlp);

app.use('/', ensureLoggedIn('/login'), profile);
app.use('/profile', ensureLoggedIn('/login'), profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
