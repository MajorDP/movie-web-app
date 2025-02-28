const HttpError = require("../models/HttpError");
const User = require("../models/users");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return next(new HttpError("Passwords don't match."));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again later.", 500));
  }

  if (existingUser) {
    return next(new HttpError("User with this email already exists.", 401));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFem0b3QKwZNYgZ3eCClFlnIlIn5V1nDJjw&s",
    savedMovies: [],
  });

  try {
    newUser.save();
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again later.", 500));
  }

  res.json({
    ...newUser.toObject({ getters: true }),
    isLoggedIn: true,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Sign in failed, please try again later.", 500));
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!existingUser || !isMatch) {
    return next(new HttpError("Incorrect email or password.", 401));
  }

  res.json({
    ...existingUser.toObject({ getters: true }),
    isLoggedIn: true,
  });
};

const getUserMovies = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Sign in failed, please try again later.", 500));
  }

  return res.json(
    user.savedMovies.map((movie) => movie.toObject({ getters: true }))
  );
};

const saveMovie = async (req, res, next) => {
  const { movie, userId } = req.body;

  if (!movie || !userId) {
    return next(new HttpError("Missing movie or user ID.", 400));
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  user.savedMovies.unshift(movie);

  try {
    await user.save();
  } catch (error) {
    console.log(error.message);
    return next(new HttpError("Saving movie failed, please try again.", 500));
  }

  return res.json({
    message: "Movie Saved!",
    savedMovies: user.savedMovies,
  });
};

const removeSavedMovie = async (req, res, next) => {
  const { movieId, userId } = req.body;

  if (!movieId || !userId) {
    return next(new HttpError("Missing movie ID or user ID.", 400));
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  const initialLength = user.savedMovies.length;

  user.savedMovies = user.savedMovies.filter(
    (movie) => movie.movieId !== movieId
  );

  if (user.savedMovies.length === initialLength) {
    return next(new HttpError("Movie not found in saved list.", 404));
  }

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("Removing movie failed, please try again.", 500));
  }

  return res.json({
    message: "Movie Removed!",
    savedMovies: user.savedMovies,
  });
};

exports.register = register;
exports.login = login;
exports.getUserMovies = getUserMovies;
exports.removeSavedMovie = removeSavedMovie;
exports.saveMovie = saveMovie;
