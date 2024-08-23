const mongoose = require('mongoose');

const setupMongoDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
};

module.exports = setupMongoDB;
