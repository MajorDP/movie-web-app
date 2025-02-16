const HttpError = require("../models/HttpError");
const Movie = require("../models/movies");

const movies = [
  {
    id: "1",
    title: "Avengers: Endgame",
    description:
      "The Avengers assemble for a final showdown against Thanos in this epic conclusion to the Infinity Saga, as they work to undo the damage caused in 'Infinity War'.",
    img: "https://lumiere-a.akamaihd.net/v1/images/au_marvel_avengersendgame_hero_m_f8ba68d1.jpeg?region=0,133,750,422",
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    releaseDate: "2019-04-26",
    genres: ["Action", "Adventure", "Sci-Fi"],
    duration: 181,
    rating: 3,
    director: "Anthony Russo, Joe Russo",
    cast: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Scarlett Johansson",
      "Mark Ruffalo",
    ],
    language: "English",
    awards: ["Oscar", "Golden Globe", "Screen Actors Guild Award"],
    reviews: [
      {
        id: "r1",
        userId: "1",
        rating: 3,
        datePosted: "14.02.2025",
        userEmail: "asura@abv.bg",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFem0b3QKwZNYgZ3eCClFlnIlIn5V1nDJjw&s",
        comment: "Not really my best choice.",
      },
    ],
  },
  {
    id: "3",
    title: "Deadpool 3",
    description:
      "Deadpool teams up with Wolverine and other mutants to face a new threat in this action-packed, fourth-wall-breaking adventure.",
    img: "https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://www.youtube.com/watch?v=73_1biulkYk",
    releaseDate: "2024-11-10",
    genres: ["Action", "Adventure", "Sci-Fi"],
    duration: 120,
    rating: 4,
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Morena Baccarin", "Emma Corrin"],
    language: "English",
    awards: ["MTV Movie Awards", "Golden Globe (nominated)"],
    reviews: [],
  },
  {
    id: "4",
    title: "Deadpool",
    description:
      "Wade Wilson, a former Special Forces operative turned mercenary, becomes Deadpool after undergoing an experimental treatment that leaves him with accelerated healing powers. He seeks revenge on the man who nearly destroyed his life.",
    img: "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png",
    trailer: "https://www.youtube.com/watch?v=73_1biulkYk",
    releaseDate: "2016-02-12",
    genres: ["Action", "Comedy", "Superhero"],
    duration: 108,
    rating: 5,
    director: "Tim Miller",
    cast: ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller", "Ed Skrein"],
    language: "English",
    awards: ["Golden Globe (nominated)", "Teen Choice Award"],
    reviews: [
      {
        id: "r1",
        userId: "1",
        rating: 3,
        datePosted: "14.02.2025",
        userEmail: "asura@abv.bg",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFem0b3QKwZNYgZ3eCClFlnIlIn5V1nDJjw&s",
        comment: "Amazing movie.",
      },
    ],
  },
];

const postMovie = async (req, res, next) => {
  try {
    const {
      id,
      title,
      description,
      img,
      trailer,
      releaseDate,
      genres,
      duration,
      rating,
      director,
      cast,
      language,
      awards,
      reviews,
    } = req.body;

    // Creating a new movie document
    const newMovie = new Movie({
      id,
      title,
      description,
      img,
      trailer,
      releaseDate, // Ensure frontend sends date in ISO format: YYYY-MM-DD
      genres,
      duration,
      rating,
      director,
      cast,
      language,
      awards,
      reviews,
    });

    // Save to database
    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (err) {
    const error = new HttpError("Couldn't get movies.", 500);
    return next(error);
  }
};

const getFeaturedMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    const error = new HttpError("Couldn't get movies.", 500);
    return next(error);
  }
  res.json(movies.slice(-3));
};
const getMovie = async (req, res, next) => {
  const id = req.params.id;

  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    const error = new HttpError("Couldn't get movie.", 500);
    return next(error);
  }

  if (!movie) {
    return next(new HttpError("Movie could not be found.", 404));
  }

  const movieObj = movie.toObject({ getters: true });

  movieObj.id = movieObj._id;
  delete movieObj._id;

  res.json(movieObj);
};

const getPopularMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    const error = new HttpError("Couldn't get movies.", 500);
    return next(error);
  }

  const sortedMovies = movies.sort((a, b) => b.rating - a.rating).slice(0, 3);
  if (!sortedMovies) {
    return next(new HttpError("Movies could not be found.", 404));
  }

  res.json(sortedMovies.map((movie) => movie.toObject({ getters: true })));
};

const getMovies = async (req, res, next) => {
  const searchValue = req.query.val1 || "";
  const sortValue = req.query.val2 || "";

  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    const error = new HttpError("Couldn't get movies.", 500);
    return next(error);
  }

  const [type, value] = sortValue.split("-");
  const filteredMovies =
    searchValue !== ""
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : movies;

  const sortedMovies =
    sortValue !== "" && type && value
      ? filteredMovies.sort((a, b) => {
          if (type === "awards") {
            return value === "asc"
              ? a.awards.length - b.awards.length
              : b.awards.length - a.awards.length;
          }
          if (value === "asc") {
            return a[type] - b[type];
          } else {
            return b[type] - a[type];
          }
        })
      : filteredMovies;

  res.json(sortedMovies.map((movie) => movie.toObject({ getters: true })));
};

const submitReview = async (req, res, next) => {
  const review = req.body.review;
  const movieId = req.params.id;

  if (!review) {
    return next(new HttpError("No review found.", 404));
  }

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    const error = new HttpError("Couldn't get movie.", 500);
    return next(error);
  }

  movie.reviews.unshift(review);

  try {
    movie.save();
  } catch (err) {
    const error = new HttpError("Couldn't save review.", 500);
    return next(error);
  }

  res.json({ message: "works" });
};
exports.getFeaturedMovies = getFeaturedMovies;
exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.getPopularMovies = getPopularMovies;
exports.submitReview = submitReview;
exports.postMovie = postMovie;
