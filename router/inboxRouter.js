// dependencies import
const express = require("express");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");
const {
  getInbox,
  searchUser,
  addConversation,
  getMessages,
  sendMessage,
} = require("../controller/inboxController");
const { checkLogin } = require("../middleware/common/checkLogin");
const attachmentUpload = require("../middleware/inbox/attachmentUpload");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

// search user for conversation
router.post("/search", checkLogin, searchUser);

// add conversation
router.post("/conversation", checkLogin, addConversation);

// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);

// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

// export routes
module.exports = router;
