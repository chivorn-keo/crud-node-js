const setGlobalVarMiddleware = (req, res, next) => {
  res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
  res.locals.currentUrl = req.originalUrl;
  next();
}

module.exports = setGlobalVarMiddleware