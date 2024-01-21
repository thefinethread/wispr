require('dotenv').config();
require('colors');
const express = require('express');
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/user.routes');
const conversationRouter = require('./routes/conversation.routes');
const messageRouter = require('./routes/message.routes');
const path = require('path');
const socketServer = require('./socketio/socketServer');

const PORT = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messageRouter);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// error middleware at the end always
app.use(errorHandler);

dbConnect().then(() => {
  const server = app.listen(PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server is running on port: ${PORT}`.underline
        .blue
    );
  });

  socketServer(server);
});
