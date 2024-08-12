const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: True
    },
    password: {
        type: String,
        required: True
    }
});

const User= mongoose.model('User',userSchema);
module.exports =User