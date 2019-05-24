const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { bcrypt } = require('../helpers/')


const QuestionSchema = new Schema({
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
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  view: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  tags: [{
    type: String,

  }]
  ,
  status: {
    type: String,
    default: false,
  },
}, {
    timestamps: {}
  })


const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question