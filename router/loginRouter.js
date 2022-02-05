// dependencies import
const express = require("express");
const { getLogin } = require("../controller/loginController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Login"), getLogin);

// export routes
module.exports = router;
