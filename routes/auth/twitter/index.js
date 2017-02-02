let express = require('express')
let router = express.Router()
let Twitter = require('twitter')
let config = require('../../config.json')
let passport = require('passport')
var TwitterStrategy = require('passport-twitter')

passport.use(new TwitterStrategy({
  consumerKey: config.twitter_api_key,
  consumerSecret: config.twitter_api_secret,
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/index/callback'
},
  function (token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }
))

router.get('/login', function (req, res) {
  passport.authenticate('twitter'));
  // let searchQuery = req.query.q
  // client.get('search/tweets', {q: searchQuery}, function (error, tweets, response) {
  //   const result = JSON.parse(response.body)
  //   console.log({result})
  //   res.send(tweets)
  // })
})

router.get('/callback', function (req, res) {
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
})

module.exports = router
