var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//log.errors
app.use(function (err,req,res,next){
  const status = err.status || 500;
  if(status >= 500 || req.app.get('env') === 'development'){
    console.error(err.stack);
  }
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  res.status(status);
  const message = status >= 500 ? "You fucked up boy": err.message;
  const expose = status >= 500 && req.app.get('env') === 'development';
  res.end(expose ? message + '\n\n' + err.stack : mmessage);
});

module.exports = app;
