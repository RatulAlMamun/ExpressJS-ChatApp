// middleware for set template response data
function decorateHtmlResponse(pageTitle) {
  // return the middleware
  return function (req, res, next) {
    // template page title
    res.locals.title = `${pageTitle} | ${process.env.APP_NAME}`;

    // flag for response decision - template or json
    res.locals.html = true;

    // others local variable, can be empty
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    next();
  };
}

// exports module
module.exports = {
  decorateHtmlResponse,
};
