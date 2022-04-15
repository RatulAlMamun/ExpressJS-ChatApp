// dependencies
const User = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// login template rendering
function getLogin(req, res) {
  res.render("index");
}

// do login
async function login(req, res, next) {
  try {
    // find user by email or password
    const user = await User.findOne({
      $or: [
        {
          email: req.body.username,
        },
        {
          mobile: req.body.username,
        },
      ],
    });

    if (user && user._id) {
      // check for password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          userid: user._id,
          username: user.name,
          email: user.email,
          role: user.role || "user",
          avatar: user.avatar || null,
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET);

        // set cookies
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = userObject;

        res.redirect("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (error) {
    res.render("index", {
      data: { username: req.body.username },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out.");
}

// exports module
module.exports = { getLogin, login, logout };
