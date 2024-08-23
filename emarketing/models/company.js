const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template', 
        default: function() {
            return new mongoose.Types.ObjectId(); 
            
        },
        default: function() {
          return new mongoose.model('Section', SectionSchema)();
        }
        
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    // published: {
    //   type: Boolean,
    //   required: true,
    // }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
