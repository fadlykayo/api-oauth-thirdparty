let express = require('express')
let passport = require('passport')
let router = express.Router()
let userController = require('../controllers/users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('index')
})

router.get('api/get', userController.verify, userController.getUsers)

router.delete('api/:id', userController.deleteUser)

router.put('api/:id', userController.updateUser)

router.post('api/signin', userController.signIn)

router.post('api/signup', userController.signUp)

router.get('/auth/twitter/login', passport.authenticate('twitter'))

router.get('/auth/google/login', passport.authenticate('google'))

router.get('/auth/facebook/login', passport.authenticate('facebook'))

router.use('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.use('/auth/google/callback', passport.authenticate('google', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.use('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.get('/auth/login/failed', function (req, res) {
  res.send('Auth login failed.')
})

router.get('/auth/login/success', function (req, res) {
  res.send('Auth login success')
})

module.exports = router
