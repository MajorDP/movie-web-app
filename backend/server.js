const express = require("express");
const cors = require("cors");

const moviesRouter = require("./routes/movie-routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

app.listen(5000);
