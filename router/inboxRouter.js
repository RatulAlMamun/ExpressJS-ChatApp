const express = require("express");
const { getInbox } = require("../controller/inboxController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
