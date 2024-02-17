const mongoose = require('mongoose');

require('dotenv').config();

const connectDatabase = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
}

module.exports = connectDatabase