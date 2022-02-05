// dependencies import
const express = require("express");
const { getUsers } = require("../controller/usersController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Users"), getUsers);

// export routes
module.exports = router;
