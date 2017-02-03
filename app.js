var express = require('express')
var app = express()
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')
var googleAuth = require('./routes/auth/google/index')
var facebookAuth = require('./routes/auth/facebook/index')
var twitterAuth = require('./routes/auth/twitter/index')
var twitterCb = require('./routes/auth/twitter/callback')
var facebookCb = require('./routes/auth/facebook/callback')
var googleCb = require('./routes/auth/google/callback')

require('dotenv').config()
let passport = require('passport')
let TwitterStrategy = require('passport-twitter').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let GoogleStrategy = require('passport-google').Strategy
let config = require('./config.json')
let User = require('./models/users')
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

// Twitter

app.use(session({
  secret: 'keyboard cat',
  key: 'sid',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new TwitterStrategy({
  consumerKey: config.twitter_api_key,
  consumerSecret: config.twitter_api_secret,
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
},
  function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'twitter.id': profile.id }, function (err, user) {
        if (err) return done(err)
        if (user) { return done(null, user) } else {
          var newUser = new User()
          newUser.twitter.id = profile.id
          newUser.twitter.token = token
          newUser.twitter.username = profile.username
          newUser.twitter.displayName = profile.displayName

          newUser.save(function (err) {
            if (err) {
              throw err
            }
            return done(null, newUser)
          })
        }
      })
    })
  }
))

passport.use(new FacebookStrategy({
  clientID: config.facebook_app_id,
  clientSecret: config.facebook_app_secret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) return done(err)
        if (user) { return done(null, user) } else {
          var newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.token = accessToken
          // newUser.facebook.email = (profile.emails[0].value || '').toLowerCase()
          newUser.facebook.name = profile.displayName

          newUser.save(function (err) {
            if (err) {
              throw err
            }
            return done(null, newUser)
          })
        }
      })
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
app.use('/auth/facebook/callback', facebookCb)
app.use('/auth/twitter/index', twitterAuth)
app.use('/auth/twitter/callback', twitterCb)
app.use('/auth/google/callback', googleCb)
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
