let express = require('express')
let router = express.Router()
let Twitter = require('twitter')
let config = require('../../../config.json')

let client = new Twitter({
  consumer_key: config.twitter_api_key,
  consumer_secret: config.twitter_api_secret,
  access_token_key: config.twitter_access_token,
  access_token_secret: config.twitter_access_token_secret
})

router.get('/', function (req, res) {
  let searchQuery = req.query.q
  // search/tweets dari sananya!!
  client.get('search/tweets', {q: searchQuery}, function (error, tweets, response) {
    const result = JSON.parse(response.body)
    console.log({result})
    res.send(tweets)
  })
  // res.send('search')
})

module.exports = router
