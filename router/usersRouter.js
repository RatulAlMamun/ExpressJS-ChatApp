// dependencies import
const express = require("express");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middleware/users/userValidators");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");
const { checkLogin } = require("../middleware/common/checkLogin");
const avatarUpload = require("../middleware/users/avatarUpload");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

// add user
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

// export routes
module.exports = router;
