const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURI');

mongoose.set('strictQuery', true);

const database = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected...');
  } catch (err) {
    console.log(err.message);
    //For exiting process with failure
    process.exit(1);
  }
};

module.exports = database;
