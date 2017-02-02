var express = require('express')
var router = express.Router()
let models = require('../models')
let config = require('../config.json')
let jwt = require('jsonwebtoken')
let hash = require('password-hash')

module.exports = {
  getUsers: (req, res) => {
    models.Users.findAll().then(function (data) {
      res.send({users: data})
    }).catch(function (err) {
      res.json(err)
    })
  },
  // createUser: (req, res) => {
  //   models.Users.create({
  //     username: req.body.username,
  //     password: hash.generate(req.body.password),
  //     email: req.body.email,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }).then(function (data) {
  //     res.json({data})
  //   }).catch(function (err) {
  //     res.json(err)
  //   })
  // },
  deleteUser: (req, res) => {
    models.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(`Delete user with ID: ${req.params.id}`)
    }).catch(function (err) {
      res.json(err)
    })
  },
  updateUser: (req, res) => {
    models.Users.findById(req.params.id).then(function (findUser) {
      findUser.update({
        token: req.body.token,
        updatedAt: new Date()
      }).then(function (data) {
        res.json({data, message: 'Data has been updated'})
      })
    }).catch(function (err) {
      res.json(err)
    })
  },
  signUp: (req, res) => {
    models.Users.create({
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
  signIn: (req, res) => {
    models.Users.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (data) {
      if (data.username !== req.body.username) {
        res.json({success: false, message: 'Authentication failed. User not found.'})
      } else {
        if (hash.verify(req.body.password, data.password)) {
          let token = jwt.sign({data}, config.secret, {algorithm: 'HS256'}, {expiresIn: '1h'})
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
  verifyRole: (req, res, next) => {
    req.decoded = jwt.verify(req.header('Authorization'), config.secret)
    if (req.decoded.data.role === 'admin') {
      next()
    } else if (req.decoded.data.role === 'user') {
      res.json({message: 'Authentication failed. Role: user'})
    } else {
      res.json({message: 'Authentication failed.'})
    }
  }
  // user token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMCwidXNlcm5hbWUiOiJnYW5hIiwicGFzc3dvcmQiOiJzaGExJGIwNzQxMDAyJDEkODQ0NjI0M2EwOTkzOTllMTRmMTVlMWJhZjFhNTk2NjFjZmZiN2ZiMSIsInJvbGUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAxNy0wMi0wMVQxNDozODozNS40NTdaIiwidXBkYXRlZEF0IjoiMjAxNy0wMi0wMVQxNDozODozNS40NThaIn0sImlhdCI6MTQ4NTk2MTIyM30.-_h42s8dyVtynPAX8Xi2JT5vJ-gEJUxvOEDzIsOCTYw'
  // admin token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJ1c2VybmFtZSI6ImZhZGx5a2F5byIsInBhc3N3b3JkIjoic2hhMSQ1YzVjMDU5NiQxJDFiY2UyNzE3NTgyNGEzNWQxNDlkYWNlMzI1NTY4NzMyZWQzMWUxMTEiLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDE3LTAyLTAxVDE0OjM4OjI4LjkzNloiLCJ1cGRhdGVkQXQiOiIyMDE3LTAyLTAxVDE0OjM4OjI4Ljk0MFoifSwiaWF0IjoxNDg1OTYwNzE0fQ.346wzGxKt1_9S_gC3gOrgCyGNyGfdIhtW4EDosAp0gY'
}
