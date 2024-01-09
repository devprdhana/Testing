const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = () => {
  mongoose
    .connect(
      `mongodb+srv://wunderux:${process.env.MONGODB_PASSWORD}@cluster0.j5bpr7p.mongodb.net/?retryWrites=true&w=majorityy`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Set a higher value than the default 30000 (30 seconds)
      }
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

connectDb();

exports.connectDb = connectDb;
