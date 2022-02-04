// dependencies
const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  // set the error message based on environment
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);

  // check wheather the response will be json or html template
  if (res.locals.html) {
    // html response
    res.render("error", {
      title: "Error Page",
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
