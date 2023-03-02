const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String},
  content: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
