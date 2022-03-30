// dependencies
const { check, validationResult } = require("express-validator");

// login validator logic
const doLoginValidators = [
  check("username").isLength({ min: 1 }).withMessage("username is required."),
  check("password").isLength({ min: 1 }).withMessage("password required."),
];

// validation handler
const doLoginValidationHandler = (req, res, next) => {
  // fetch the error
  const error = validationResult(req);

  // mapped the errors with specific format
  const mappedError = error.mapped();

  //check if errors
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.render("index", {
      data: { username: req.body.username },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// export module
module.exports = { 
  doLoginValidators,
  doLoginValidationHandler
};
