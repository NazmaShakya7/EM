const mongoose = require('mongoose');
const Template = require('./template');

const sectionSchema = new mongoose.Schema({
  template: {
    type: mongoose.Schema.Types.ObjectId, ref: 'template',
    required: true
  },
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed //for different maps
  },
  order: {
    type: Number,
    required: true
  }
});

//same here as well
const Section = mongoose.model('Section', sectionSchema);
module.exports = Section; 