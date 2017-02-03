var express = require('express')
var router = express.Router()
let jwt = require('jsonwebtoken')
let hash = require('password-hash')
let Users = require('../models/users')
let config = require('../config.json')

module.exports = {
  getUsers: (req, res) => {
    Users.find().then(function (data) {
      res.send({Users: data})
    }).catch(function (err) {
      res.json(err)
    })
  },
  signUp: (req, res) => {
    Users.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function (data) {
      res.json({data, success: true})
    }).catch(function (err) {
      res.json(err)
    })
  },
  deleteUser: (req, res) => {
    Users.findOneAndRemove({id: req.params.id}).then(function (data) {
      res.send(`Delete user with ID: ${req.params.id}`)
    }).catch(function (err) {
      res.json(err)
    })
  },
  updateUser: (req, res) => {
    Users.findOneAndUpdate({id: req.params.id}, req.body, {new: true}).then(function (data) {
      res.json({data, message: 'Data has been updated'})
    }).catch(function (err) {
      res.json(err)
    })
  },
  signIn: (req, res) => {
    Users.find({username: req.body.username}).then(function (data) {
      if (data.length === 0) {
        res.json({success: false, message: 'Authentication failed. User not found.'})
      } else {
        if (hash.verify(req.body.password, data[0].password)) {
          let token = jwt.sign({data}, config.secret, {algorithm: 'HS256'}, {expiresIn: '1d'})
          res.json({
            success: true,
            token: token
          })
        } else {
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
        }
      }
    }).catch(function (err) {
      res.json(err)
    })
  },
  verify: (req, res, next) => {
    // if (Us)
    // passport.authenticate('twitter')
    req.decoded = jwt.verify(req.header('Authorization'), config.secret)
    if (req.decoded.data[0].username === req.header('Username') && hash.verify(req.header('Password'), req.decoded.data[0].password)) {
      next()
    } else {
      res.json({message: 'Authentication failed.'})
    }
  }
}
// fadly: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJfaWQiOiI1ODkzMDc5OWQwM2MxMzJlMGE2NzNkZjMiLCJ1c2VybmFtZSI6ImZhZGx5IiwicGFzc3dvcmQiOiJzaGExJGFiN2U3ODg2JDEkYTMxMmU0MTVkYWNlMjcwNTZlMmM2ZWMyZTkzZTNlMTlkYjMwYWQxOCIsImNyZWF0ZWRBdCI6IjIwMTctMDItMDJUMTA6MTk6MDUuMTcwWiIsInVwZGF0ZWRBdCI6IjIwMTctMDItMDJUMTA6MTk6MDUuMTcwWiIsIl9fdiI6MH1dLCJpYXQiOjE0ODYwMzEwNTZ9.G-Ao8O1gK0vRxjaZ5byAgZ9aTI1TqJxdgcr3YvLTFpA
