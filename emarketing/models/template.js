const mongoose = require('mongoose');
// Assuming Page model is defined somewhere


const templateSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  template_name: {
    type: String,
    required: true,
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',

  }
});


const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
