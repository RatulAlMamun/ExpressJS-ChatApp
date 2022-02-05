const express = require("express");
const { getLogin } = require("../controller/loginController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
