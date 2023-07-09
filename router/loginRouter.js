const express = require("express");

const { getLogin } = require("../controller/loginController");
const decoreateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decoreateHtmlResponse("Login"), getLogin);

module.exports = router;
