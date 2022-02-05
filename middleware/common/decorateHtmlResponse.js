function decorateHtmlResponse(pageTitle) {
  return function (req, res, next) {
    res.locals.title = pageTitle;
    res.locals.html = true;
    next();
  };
}

module.exports = {
  decorateHtmlResponse,
};
