
const mongoose = require('mongoose');

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
    id: {
      type: String,
      required: true,
    },
    pagetype: {
      type: String,
      required: true,
    },
    section: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
});

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;
