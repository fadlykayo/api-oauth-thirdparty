'use strict'

var LocalStrategy = require('passport-local').Strategy
let RegisterStrategy = require('passport-local-register').Strategy
let TwitterStrategy = require('passport-twitter').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
let GithubStrategy = require('passport-github2').Strategy
let config = require('./config.json')
let User = require('../models/users')

module.exports = function (passport) {
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
              if (err) throw err
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
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
          if (err) return done(err)
          if (user) { return done(null, user) } else {
            var newUser = new User()
            newUser.facebook.id = profile.id
            newUser.facebook.token = token
            // newUser.facebook.email = (profile.emails[0].value || '').toLowerCase()
            newUser.facebook.name = profile.displayName

            newUser.save(function (err) {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))

  passport.use(new GoogleStrategy({
    clientID: config.google_clientID,
    clientSecret: config.google_clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        User.findOne({ 'google.id': profile.id }, function (err, user) {
          if (err) return done(err)
          if (user) { return done(null, user) } else {
            var newUser = new User()
            newUser.google.id = profile.id
            newUser.google.token = token
            newUser.google.email = profile.emails[0].value
            newUser.google.name = profile.displayName

            newUser.save(function (err) {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))
}
