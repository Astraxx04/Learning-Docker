const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect("mongodb://database:27017/trackleafDb");
}

module.exports = connectDB;
// mongodb://database:27017/trackleafDb