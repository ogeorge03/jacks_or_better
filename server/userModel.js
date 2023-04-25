const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

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
    type: Long,
    required: true,
    default: 100,
    min: 0,
  },
  high_score: {
    type: Long,
    required: true,
    default: 100
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"]
  },
  token: {
    type: String,
    required: false,
    default: null
  },
  token_invalid: {
    type: Boolean,
    required: true,
    default: false
  },
  restarts: {
    type: Number,
    required: true,
    default: 0
  },
})

module.exports = mongoose.model('users', schema) //users is the name of the collection in the db




