const express = require("express");
const routes = require("./routes/fileshare");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
if (process.env.SERVER=="LOCAL") {
  mongoose
    .connect("mongodb://127.0.0.1:27017/shareFile")
  .then(() => {
    console.log("LOCAL Database connected Successully.");
  })
  .catch((err) => {
    console.log("Database connected failed ", err);
  });
} else {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3qnwaw3.mongodb.net/`
  )
   .then(() => {
    console.log("REMOTE Database connected Successully.");
  })
  .catch((err) => {
    console.log("Database connected failed ", err);
  });
}


app.use(express.json());

app.use("", routes);

app.listen(10000, () => {
  console.log("listening on 10000");
});
