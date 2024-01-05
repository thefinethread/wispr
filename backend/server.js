require('dotenv').config();
require('colors');
const express = require('express');
const dbConnect = require('./config/db');

const app = express();

const PORT = process.env.PORT || 6000;

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server is running on port: ${PORT}`.underline
        .cyan
    );
  });
});
