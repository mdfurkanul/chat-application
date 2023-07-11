const express = require("express");
const {
  authValidators,
  authValidationHandler,
} = require("../middlewares/login/loginValidators");
const {
  getLogin,
  userAuthentication,
  logOutUser,
} = require("../controller/loginController");
const decoreateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { authRedirect } = require("../middlewares/common/authCheck");

const router = express.Router();
const page_title = "Login";

//login page
router.get("/", authRedirect, decoreateHtmlResponse(page_title), getLogin);
router.post(
  "/",
  authRedirect,
  decoreateHtmlResponse(page_title),
  authValidators,
  authValidationHandler,
  userAuthentication
);
router.delete("/", logOutUser);

module.exports = router;
