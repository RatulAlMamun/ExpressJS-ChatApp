// dependencies import
const express = require("express");
const { getLogin, login } = require("../controller/loginController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Login"), getLogin);

// process login
router.post("/", login);

// export routes
module.exports = router;
