require('dotenv').config();
const express = require('express');
const config = require('./config/index');
require('./config/database');
const middleware = require('./config/middleware');
const app = express();
middleware(app);
const index = require('./routes/index');

app.use('/', index);

app.listen(config.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      == SERVER RUNNING ==
      PORT: ${config.PORT}
      MODE: ${process.env.NODE_ENV}
    `);
  }
});
