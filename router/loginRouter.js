// dependencies import
const express = require("express");
const { getLogin, login, logout } = require("../controller/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidator");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

// creating router instances for route setup
const router = express.Router();

// set page title
const pageTitle = "Login";

// route
router.get("/", decorateHtmlResponse(pageTitle), getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(pageTitle),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// logout
router.delete("/", logout);

// export routes
module.exports = router;
