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
const avatarUpload = require("../middleware/users/avatarUpload");
const { checkLogin, requireRole } = require("../middleware/common/checkLogin");

// creating router instances for route setup
const router = express.Router();

// route
router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", requireRole(["admin"]), removeUser);

// export routes
module.exports = router;
