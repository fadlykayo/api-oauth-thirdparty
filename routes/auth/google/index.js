let express = require('express')
let router = express.Router()
let userController = require('../../../controllers/users')
let passport = require('passport')

router.get('/get', userController.getUsers)

router.delete('/:id', userController.deleteUser)

router.put('/:id', userController.updateUser)

router.post('/signin', userController.signIn)

router.post('/signup', userController.signUp)

router.get('/', passport.authenticate('facebook'))

router.get('/failed', function (req, res) {
  res.send('Facebook login failed')
})

router.get('/success', function (req, res) {
  res.send('Facebook login success')
  // let searchQuery = req.query.q
  // client.get('search/tweets', {q: searchQuery}, function (error, tweets, response) {
  //   const result = JSON.parse(response.body)
  //   console.log({result})
  //   res.send(tweets)
  // })
})

module.exports = router
