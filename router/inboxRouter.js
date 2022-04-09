// dependencies import
const express = require("express");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");
const { getInbox } = require("../controller/inboxController");
const checkLogin = require("../middleware/common/checkLogin");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

// export routes
module.exports = router;
