var express = require('express')
var router = express.Router()
let booksController = require('../../controllers/books')

/* GET home page. */

router.get('/', booksController.getBooks)

router.get('/:isbn', booksController.getBook)

router.post('/', booksController.createBook)

router.delete('/:isbn', booksController.deleteBook)

router.put('/:isbn', booksController.updateBook)
//
// router.post('/signin', libraryController.signIn)

module.exports = router
