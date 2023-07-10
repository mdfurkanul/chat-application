const express = require("express");

const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decoreateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidatoionHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

//login page
router.get("/", decoreateHtmlResponse("Users"), getUsers);
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidatoionHandler,
  addUser
);
router.delete("/:id", removeUser);

module.exports = router;
