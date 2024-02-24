const errorHandler = (err, req, res, next) => {
  res.render('pages/internal-server-error');
}

module.exports = errorHandler