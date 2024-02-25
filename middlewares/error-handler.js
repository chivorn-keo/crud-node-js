const BadRequest = require('../exeptions/bad-request')
const { 
  redirectWithMessage
} = require('../helpers/general-helper')

const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequest) {
    return redirectWithMessage(req, res, '/auth/register', 'error', err.message)
  }

  res.render('pages/internal-server-error');
}

module.exports = errorHandler