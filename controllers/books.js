let Books = require('../models/books')

module.exports = {
  getBooks: (req, res) => {
    Books.find().then(function (data) {
      res.send({Books: data})
    }).catch(function (err) {
      res.json(err)
    })
  },
  getBook: (req, res) => {
    Books.find({isbn: req.params.isbn}).then(function (data) {
      res.send({Book: data})
    }).catch(function (err) {
      res.json(err)
    })
  },
  createBook: (req, res) => {
    Books.create({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }).then(function (data) {
      res.json({data})
    }).catch(function (err) {
      res.json(err)
    })
  },
  deleteBook: (req, res) => {
    Books.findOneAndRemove({isbn: req.params.isbn}).then(function (data) {
      res.send(`Deleted Book with ISBN: ${req.params.isbn}`)
    }).catch(function (err) {
      res.json(err)
    })
  },
  updateBook: (req, res) => {
    Books.findOneAndUpdate({isbn: req.params.isbn}, req.body, {new: true}).then(function (data) {
      // new true -> mengembalikan data baru
      res.json(data)
    }).catch(function (err) {
      res.json(err)
    })
  }
}
