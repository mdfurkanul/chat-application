const express = require("express");

const { getInbox } = require("../controller/inboxController");
const decoreateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decoreateHtmlResponse("Inbox"), getInbox);

module.exports = router;
