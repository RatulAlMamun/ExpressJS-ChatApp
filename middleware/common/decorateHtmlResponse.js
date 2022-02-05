// middleware for set template response data
function decorateHtmlResponse(pageTitle) {
  // return the middleware
  return function (req, res, next) {
    // template page title
    res.locals.title = `${pageTitle} | ${process.env.APP_NAME}`;

    // flag for response decision - template or json
    res.locals.html = true;
    next();
  };
}

// exports module
module.exports = {
  decorateHtmlResponse,
};
