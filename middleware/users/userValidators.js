// dependencies
const path = require("path");
const { unlink } = require("fs");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");

// user field validation array
const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required.")
    .isAlpha("en-US", {
      ignore: " -",
    })
    .withMessage("Name must not contains anything other than alphabet.")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already in use.");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number.")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number is already in use.");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol."
    ),
];

// user validation handler
const addUserValidationHandler = (req, res, next) => {
  // fetch the error
  const error = validationResult(req);

  // mapped the errors with specific format
  const mappedError = error.mapped();

  //check if errors
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    // check if file already uploaded
    if (req.files.length > 0) {
      // remove the uploaded files
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(500).json({ errors: mappedError });
  }
};

// exports module
module.exports = {
  addUserValidator,
  addUserValidationHandler,
};
