const mongoose = require("mongoose");
require('dotenv').config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(err.message);
    console.log("MongoDB Connection Failed");
    process.exit(1); 
  }
};
