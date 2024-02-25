const { 
  redirectWithMessage,
  renderViewWithMessage
} = require('../helpers/general-helper');
const BadRequest = require('../exeptions/bad-request');
const User = require('../models/user-model');

const registerUser = (req, res) => {
  return renderViewWithMessage(req, res, 'auth/register');
}

const storeUser = async(req, res, next) => {
  try {
    const { 
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    } = req.body;

    if (password != confirmPassword) {
      throw new BadRequest('Confirm password is incorrect');
    }

    const emailExisted = User.findOne({ email: email});
    if(emailExisted){
      throw new BadRequest('Email is already existed');
    }

    const user = User.create({
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
    });
    return redirectWithMessage(req, res, '/', 'success', 'Login successfully');
  } catch (error) {
    next(error);
  }
  
}

module.exports = {
  registerUser,
  storeUser
}