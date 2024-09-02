const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  pagetype: {
    type: String,
    required: true,
  },
  // section: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Section',
  //     default: function() {
  //       return new mongoose.model('Section', SectionSchema)();
  //     }
  //   },
    
  // ],
  section:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section', 
    default: function() {
        return new mongoose.Types.ObjectId(); 
        
    },
    // default: function() {
    //   return new mongoose.model('Section', SectionSchema)();
    // }
    
},],
});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
