const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moviesRouter = require("./routes/movie-routes");
const usersRouter = require("./routes/users-routes");

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
  .connect(
    `mongodb+srv://pavelMovies:7539518462@movies-cluster.nxhil.mongodb.net/?retryWrites=true&w=majority&appName=Movies-Cluster`
  )
  .then(() => {
    console.log("yes");
    app.listen(5000);
  })
  .catch((err) => console.log("connection failed"));
