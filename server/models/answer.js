const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { bcrypt } = require('../helpers')

const AnswerSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [3, 'Description is too short'],
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
}, {
    timestamps: {}
  })


const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer