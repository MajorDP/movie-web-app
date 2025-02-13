const HttpError = require("../models/HttpError");

const mockUserData = [
  {
    id: "1",
    email: "asura@abv.bg",
    password: "123",
    savedMovies: [
      {
        id: "1",
        title: "Deadpool 3",
        img: "https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg",
      },
      {
        id: "3",
        title: "Avengers: Endgame",
        img: "https://lumiere-a.akamaihd.net/v1/images/au_marvel_avengersendgame_hero_m_f8ba68d1.jpeg?region=0,133,750,422",
      },
    ],
  },
];

const login = (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);

  const foundUser = mockUserData.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    return next(new HttpError("Incorrect email or password.", 401));
  }
  res.json({
    id: foundUser.id,
    isLoggedIn: true,
  });
};

exports.login = login;
