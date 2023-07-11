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
router.get("/", decoreateHtmlResponse(page_title), authRedirect, getLogin);
router.post(
  "/",
  decoreateHtmlResponse(page_title),
  authRedirect,
  authValidators,
  authValidationHandler,
  userAuthentication
);
router.delete("/", logOutUser);

module.exports = router;
