const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://oaks:wisdom0074u@cluster0.sinxrnz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database server connected succesfully"))
  .catch((err: String) => console.log(err));

app.listen(5000, () => {
  console.log("Backend server is active");
});
