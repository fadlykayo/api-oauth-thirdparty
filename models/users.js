const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  token: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    type: String
    // id: String,
    // token: String,
    // tokenSecret: String,
    // displayName: String,
    // username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Users', UserSchema)
