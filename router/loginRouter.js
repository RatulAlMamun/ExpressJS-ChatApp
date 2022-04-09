// dependencies import
const express = require("express");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidator");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");
const { redirectLoggedIn } = require("../middleware/common/checkLogin");
const { getLogin, login, logout } = require("../controller/loginController");

// creating router instances for route setup
const router = express.Router();

// set page title
const pageTitle = "Login";

// route
router.get("/", decorateHtmlResponse(pageTitle), redirectLoggedIn getLogin);

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
