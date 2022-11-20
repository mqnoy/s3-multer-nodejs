const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const userSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  avatar: String,
  original_image: String,
  watermark_image: String
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
