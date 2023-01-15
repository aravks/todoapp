const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TodoSchema = mongoose.model('TodoSchema', todoSchema);
