// dependencies import
const express = require("express");
const { getInbox } = require("../controller/inboxController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

// export routes
module.exports = router;
