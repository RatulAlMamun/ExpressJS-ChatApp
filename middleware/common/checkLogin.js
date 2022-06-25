const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

// auth guard to protect routes that need athentication
const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      // pass user info to response locals
      if (res.locals.html) {
        res.locals.loggedInUser = decode;
      }
      next();
    } catch (err) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: "Authentication failure!",
          },
        },
      });
    }
  }
};

// redirect already logged in user to inbox page
const redirectLoggedIn = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (!cookies) {
    next();
  } else {
    res.redirect("/inbox");
  }
};

// guard to protect the route for role base authentication
const requireRole = (role) => {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      next();
    } else {
      if (res.locals.html) {
        next(createError(401, "You are not authorize to access this page!"));
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "You are not authorize!",
            },
          },
        });
      }
    }
  };
};
module.exports = { checkLogin, redirectLoggedIn, requireRole };
