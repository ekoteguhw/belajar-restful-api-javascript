const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const index = require('./routes/index');

app.use('/', index);

app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`);
});
