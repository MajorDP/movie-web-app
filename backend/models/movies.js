const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  datePosted: { type: String, required: true },
  userEmail: { type: String, required: true },
  userImg: { type: String },
  comment: { type: String },
});

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  trailer: { type: String, required: true },
  releaseDate: { type: String, required: true },
  genres: [{ type: String, required: true }],
  duration: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  director: { type: String, required: true },
  cast: [{ type: String, required: true }],
  language: { type: String, required: true },
  awards: [{ type: String, required: true }],
  reviews: [{ type: reviewSchema, default: [] }],
});

module.exports = mongoose.model("Movie", movieSchema);
