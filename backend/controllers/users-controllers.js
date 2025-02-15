const HttpError = require("../models/HttpError");

const mockUserData = [
  {
    id: "1",
    email: "asura@abv.bg",
    password: "123",
    savedMovies: [
      {
        id: "3",
        title: "Deadpool 3",
        img: "https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg",
      },
      {
        id: "1",
        title: "Avengers: Endgame",
        img: "https://lumiere-a.akamaihd.net/v1/images/au_marvel_avengersendgame_hero_m_f8ba68d1.jpeg?region=0,133,750,422",
      },
    ],
  },
];

const register = (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return next(new HttpError("Passwords don't match."));
  }

  const foundUser = mockUserData.find((user) => user.email === email);

  if (foundUser) {
    return next(new HttpError("User with this email already exists.", 401));
  }
  const newUser = {
    id: mockUserData.length + 1,
    email,
    password,
    savedMovies: [],
  };

  mockUserData.push(newUser);

  res.json({
    id: newUser.id,
    isLoggedIn: true,
    savedMovies: newUser.savedMovies,
    email: newUser.email,
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = mockUserData.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    return next(new HttpError("Incorrect email or password.", 401));
  }
  res.json({
    id: foundUser.id,
    isLoggedIn: true,
    savedMovies: foundUser.savedMovies,
    email: foundUser.email,
  });
};

const getUserMovies = (req, res, next) => {
  const userId = req.params.id;

  const user = mockUserData.find((user) => user.id === userId);

  if (!user) {
    return next(new HttpError("User could not be found.", 404));
  }

  return res.json(user.savedMovies);
};

const saveMovie = (req, res, next) => {
  const movie = req.body.movie;
  const userId = req.body.userId;

  console.log(movie);
  const foundUser = mockUserData.find((user) => user.id === userId);

  foundUser.savedMovies.unshift(movie);

  return res.json({
    message: "Movie Removed!",
    savedMovies: foundUser.savedMovies,
  });
};

const removeSavedMovie = (req, res, next) => {
  const movieId = req.body.movieId;
  const userId = req.body.userId;

  const foundUser = mockUserData.find((user) => user.id === userId);

  foundUser.savedMovies = foundUser.savedMovies.filter(
    (movie) => movie.id !== movieId
  );

  return res.json({
    message: "Movie Removed!",
    savedMovies: foundUser.savedMovies,
  });
};

exports.register = register;
exports.login = login;
exports.getUserMovies = getUserMovies;
exports.removeSavedMovie = removeSavedMovie;
exports.saveMovie = saveMovie;
