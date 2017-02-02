var express = require('express')
var router = express.Router()
let userController = require('../../../controllers/users')
//
// /* GET home page. */
//
// router.get('/', userController.getBooks)
//
// router.get('/:isbn', userController.getBook)
//
// router.post('/', userController.createBook)
//
// router.delete('/:isbn', userController.deleteBook)
//
// router.put('/:isbn', userController.updateBook)
// //
// // router.post('/signin', libraryController.signIn)
//
// module.exports = router

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('facebook')
})

module.exports = router
