let express = require('express')
let router = express.Router()
let passport = require('passport')

router.use('/', passport.authenticate('facebook', { successRedirect: '/auth/facebook/index/get', failureRedirect: '/auth/facebook/index/failed' }))

module.exports = router
