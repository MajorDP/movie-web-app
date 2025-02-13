const express = require("express");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.post("/login", usersControllers.login);
router.get("/movies/user/:id", usersControllers.getUserMovies);
router.patch("/movies/user/remove", usersControllers.removeSavedMovie);
router.patch("/movies/user/save", usersControllers.saveMovie);

module.exports = router;
