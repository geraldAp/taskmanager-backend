const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected sucessfully to mongoDb");
  } catch (error) {
    console.log("Mongoose Error:", error);
  }
};

module.exports = connectDb;
