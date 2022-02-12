// dependencies import
const express = require("express");
const { getUsers, addUser, removeUser } = require("../controller/usersController");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middleware/users/userValidators");
const {
  decorateHtmlResponse,
} = require("../middleware/common/decorateHtmlResponse");

// creating router instances for route setup
const router = express.Router();

// route
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

// export routes
module.exports = router;
