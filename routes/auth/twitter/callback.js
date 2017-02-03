let express = require('express')
let router = express.Router()
let passport = require('passport')

router.use('/', passport.authenticate('twitter', { successRedirect: '/auth/twitter/index/get', failureRedirect: '/auth/twitter/index/failed' }))

module.exports = router
