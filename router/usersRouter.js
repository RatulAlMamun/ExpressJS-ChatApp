const express = require("express");
const { getUsers } = require("../controller/usersController");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
