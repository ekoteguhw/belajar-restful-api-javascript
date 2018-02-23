const mongoose = require('mongoose');
const config = require('./index');

mongoose.Promise = global.Promise;

try {
  mongoose.connect(config.DB_URL);
} catch (err) {
  mongoose.createConnection(config.DB_URL);
}

mongoose.connection
  .once('open', () => console.log('RUNNING DB'))
  .on('error', err => console.log(`ERROR DB: ${err}`));
