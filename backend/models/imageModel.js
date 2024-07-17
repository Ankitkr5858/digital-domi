const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  analysisResult: String,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;