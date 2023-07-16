const { Router } = require("express");
const usersRoutes = Router();

/* Upload Image */
const multer = require("multer");
const uploadsConfig = require("../configs/upload");
const upload = multer(uploadsConfig.MULTER);

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController();

const UsersAvatarController = require("../controllers/UsersAvatarController");
const usersAvatarController = new UsersAvatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
);

module.exports = usersRoutes;
