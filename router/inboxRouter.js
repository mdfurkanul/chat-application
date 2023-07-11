const express = require("express");

const { getInbox } = require("../controller/inboxController");
const decoreateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { authCheck } = require("../middlewares/common/authCheck");

const router = express.Router();

//login page
router.get("/", decoreateHtmlResponse("Inbox"), authCheck, getInbox);

module.exports = router;
