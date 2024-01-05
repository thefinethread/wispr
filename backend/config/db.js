const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected at host: ${conn.connection.host}`.magenta);
  } catch (err) {
    console.log(`Database connection failed`.red, err);
    process.exit(1);
  }
};

module.exports = dbConnect;
