let express = require('express')
let router = express.Router()
let userController = require('../../../controllers/users')
let passport = require('passport')

router.get('/get', userController.verify, userController.getUsers)

router.delete('/:id', userController.deleteUser)

router.put('/:id', userController.updateUser)

router.post('/signin', userController.signIn)

router.post('/signup', userController.signUp)

router.get('/login', passport.authenticate('facebook'))

router.get('/failed', function (req, res) {
  res.send('Facebook login failed')
})

router.get('/success', function (req, res) {
  res.send('Facebook login success')
})

module.exports = router
