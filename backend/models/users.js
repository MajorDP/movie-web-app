const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const savedMovie = new Schema({
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
});

const userSchema = new Schema({
  email: { type: String, required: true },
  img: { type: String, required: true },
  password: { type: String, required: true },
  savedMovies: [{ type: savedMovie, default: [] }],
});

module.exports = mongoose.model("User", userSchema);
