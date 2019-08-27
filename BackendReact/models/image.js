const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgSchema = mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  data: Buffer,
  contentType: String
});

const Image = mongoose.model('Image', ImgSchema);
module.exports = Image;
