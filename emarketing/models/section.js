const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  image: {
    type: Map,
    of: String,  
  },
  heading: {
    type: String,
    // required: true,  
  },
  subHeading: {
    type: String,
    // required: true,  
  },
  description: {
    type: String,
    // required: true,  
  },
  primaryButtonText: {
    type: String,
    // required: true, 
  },
  secondaryButtonText: {
    type: String,
    // required: true,  
  },
  order: {
    type: String,
    // required: true, 
  },
  template: 
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Template'
    }
  
});

console.log("test22");
const section = mongoose.model('section', SectionSchema);
module.exports = section; 
