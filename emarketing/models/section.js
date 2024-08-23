const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  heading: {
    type: String,
    default: "",
  },
  subHeading: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  primaryButtonText: {
    type: String,
    default: "",
  },
  secondaryButtonText: {
    type: String,
    default: "",
  },
});

const SectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: dataSchema
  },
  order: {
    type: String,
  }
});

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
