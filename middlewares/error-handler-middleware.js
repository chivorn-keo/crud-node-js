const BadRequest = require('../exeptions/bad-request-exeption');
const Unauthenticated = require('../exeptions/unauthenticated-exeption');
const { 
  redirectWithMessage
} = require('../helpers/general-helper')

const errorHandlerMiddleware = (err, req, res, next) => {

  console.log('Error : ', err);

  if (err instanceof BadRequest) {
    return redirectWithMessage(req, res, 'back', 'error', err.message)
  }

  if (err instanceof Unauthenticated) {
    return redirectWithMessage(req, res, 'back', 'error', err.message)
  }

  if (err.name == 'ValidationError') {
    let errors = [];
    Object.keys(err.errors).forEach((key) => {
      errors.push(err.errors[key].message);
    });

    return redirectWithMessage(req, res, 'back', 'error', errors)
  }

  res.render('pages/internal-server-error');
}

module.exports = errorHandlerMiddleware