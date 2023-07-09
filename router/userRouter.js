const express = require("express");

const { getUsers } = require("../controller/usersController");
const decoreateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decoreateHtmlResponse("Users"), getUsers);

module.exports = router;
