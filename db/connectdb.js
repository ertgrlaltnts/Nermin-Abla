const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "nermin-abla",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Db'ye bağlanıldı");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
