const { Router } = require("express");
const moviesRoutes = Router();

const MoviesController = require("../controllers/MoviesController");
const moviesController = new MoviesController();

moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.put("/:user_id/:id", moviesController.update);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.get("/", moviesController.index);

module.exports = moviesRoutes;
