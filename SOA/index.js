var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('signin', new LocalStrategy(function (username,passport, done){
  if (username !== 'nickie' || password !== 'secret'){
    return done(null, false);
  }
  return done(null, {username: username});
}));

router.post('/signin', passport.authenticate('signin',{session: false}),
    function (req,res,next) {
  res.json({user: req.user,
                  timestamp: Date.now()});
});

//sign-in
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
