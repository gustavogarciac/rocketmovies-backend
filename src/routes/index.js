const { Router } = require("express");
const router = Router();

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./movies.routes");

router.use("/users", usersRoutes);
router.use("/movies", moviesRoutes);

module.exports = router;
