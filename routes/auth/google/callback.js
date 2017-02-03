let express = require('express')
let router = express.Router()
let passport = require('passport')

router.use('/', passport.authenticate('google', { successRedirect: '/auth/google/index/get', failureRedirect: '/auth/google/index/failed' }))

module.exports = router
