const { Router } = require("express");
const moviesRoutes = Router();

const MoviesController = require("../controllers/MoviesController");
const moviesController = new MoviesController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.post("/", moviesController.create);
moviesRoutes.put("/:id", moviesController.update);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.get("/", moviesController.index);
moviesRoutes.delete("/:id", moviesController.delete);

module.exports = moviesRoutes;
