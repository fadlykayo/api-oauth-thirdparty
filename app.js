var express = require('express')
var app = express()
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')
var facebookAuth = require('./routes/auth/facebook/index')
var twitterAuth = require('./routes/auth/twitter/index')
var googleAuth = require('./routes/auth/google/index')

require('dotenv').config()
let passport = require('passport')
let TwitterStrategy = require('passport-twitter').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let GoogleStrategy = require('passport-google').Strategy
let config = require('./config.json')
let Users = require('./models/users')
let session = require('express-session')

// Mongoose

var mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI}`, function (err) { // localhost:27017 untuk di db
  if (err) {
    console.log(err)
  } else {
    console.log(`connected to ${process.env.PORT} ${process.env.MONGODB_URI}`)
  }
})
mongoose.Promise = global.Promise

// var db = mongoose.connection
// mongoose.connect('mongodb://localhost/library') // 27017
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   // we're connected!
// })

// Twitter

passport.use(new TwitterStrategy({
  consumerKey: config.twitter_api_key,
  consumerSecret: config.twitter_api_secret,
  callbackURL: 'http://localhost:3000/auth/twitter/index/callback'
},
  function (token, tokenSecret, profile, cb) {
    console.log(token)
    console.log(tokenSecret)
    console.log(profile)
    User.findOrCreate({ twitter: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }
))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/auth/facebook/index', facebookAuth)
app.use('/auth/twitter/index', twitterAuth)
app.use('/auth/google/index', googleAuth)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
