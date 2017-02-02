let express = require('express')
let router = express.Router()
let userController = require('../../../controllers/users')
let passport = require('passport')
let TwitterStrategy = require('passport-twitter').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let GoogleStrategy = require('passport-google').Strategy

router.use('/', passport.authenticate('twitter', { successRedirect: 'http://google.com', failureRedirect: '/failed' }))

router.get('/failed', function (req, res) {
  res.send('Twitter login failed')
})

router.get('/success', function (req, res) {
  res.send('Twitter login success')
  // let searchQuery = req.query.q
  // client.get('search/tweets', {q: searchQuery}, function (error, tweets, response) {
  //   const result = JSON.parse(response.body)
  //   console.log({result})
  //   res.send(tweets)
  // })
})

module.exports = router
