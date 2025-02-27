const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moviesRouter = require("./routes/movie-routes");
const usersRouter = require("./routes/users-routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/auth", usersRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log("no"));
