const { 
  redirectWithMessage,
  renderViewWithMessage
} = require('../helpers/general-helper');
const BadRequest = require('../exeptions/bad-request-exeption');
const Unauthenticated = require('../exeptions/unauthenticated-exeption');
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

    const emailExisted = await User.findOne({ email: email});
    if(emailExisted){
      throw new BadRequest('Email is already existed');
    }

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
    });
    res.redirect('/');

  } catch (error) {
    next(error);
  }
}

const login = (req, res) => {
  return renderViewWithMessage(req, res, 'auth/login');
}

const postLogin = async (req, res, next) => {
  try {
    const {
      email: email,
      password: password
    } = req.body;

    if (!email) throw new BadRequest('Email is required');
    if (!password) throw new BadRequest('Password is required');

    const user = await User.findOne({ email: email });
    if(!user){
      throw new Unauthenticated('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new Unauthenticated('Invalid Credentials');
    }

    req.session.user = user;

    res.redirect('/');
  } catch (error) {
    next(error);
  }
}

const logout = (req, res) => {
  req.session.user = null;
  res.redirect('/auth/login');
}

module.exports = {
  registerUser,
  storeUser,
  login,
  postLogin,
  logout,
}