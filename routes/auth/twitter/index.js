let express = require('express')
let router = express.Router()
let userController = require('../../../controllers/users')
let passport = require('passport')
let TwitterStrategy = require('passport-twitter').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let GoogleStrategy = require('passport-google').Strategy

router.get('/get', userController.getUsers)

router.delete('/:id', userController.deleteUser)

router.put('/:id', userController.updateUser)

router.post('/signin', userController.signIn)

router.post('/signup', userController.signUp)

router.get('/', passport.authenticate('twitter'))

module.exports = router
