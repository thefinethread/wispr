require('dotenv').config();
require('colors');
const express = require('express');
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 6000;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error middleware at the end always
app.use(errorHandler);

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server is running on port: ${PORT}`.underline
        .cyan
    );
  });
});
