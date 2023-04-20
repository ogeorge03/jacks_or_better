const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 20
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 1000
  },
  money: {
    type: Number,
    required: true,
    default: 100,
    min: 0,
  },
  high_score: {
    type: Number,
    required: true,
    default: 100
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"]
  },
})

module.exports = mongoose.model('users', schema) //users is the name of the collection in the db




