const express = require("express");
const movieControllers = require("../controllers/movie-controllers");

const router = express.Router();

router.get("/featured", movieControllers.getFeaturedMovies);

router.get("/filter", movieControllers.getMovies);
router.get("/popular", movieControllers.getPopularMovies);
router.get("/movie/:id", movieControllers.getMovie);
router.patch("/movie/review/:id", movieControllers.submitReview);
router.post("/movie", movieControllers.postMovie);

module.exports = router;
