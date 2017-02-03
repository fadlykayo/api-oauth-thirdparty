let express = require('express')
let router = express.Router()
let userController = require('../../../controllers/users')
let passport = require('passport')

router.get('/get', userController.verify, userController.getUsers)

router.delete('/:id', userController.deleteUser)

router.put('/:id', userController.updateUser)

router.post('/signin', userController.signIn)

router.post('/signup', userController.signUp)

router.get('/login', passport.authenticate('twitter'))

router.get('/failed', function (req, res) {
  res.send('Twitter login failed')
})

module.exports = router
