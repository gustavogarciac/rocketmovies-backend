const { Router } = require("express");
const router = Router();

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./movies.routes");
const sessionsRoutes = require("./sessions.routes");

router.use("/users", usersRoutes);
router.use("/movies", moviesRoutes);
router.use("/auth", sessionsRoutes);

module.exports = router;
