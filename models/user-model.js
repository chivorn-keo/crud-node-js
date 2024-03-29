const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
  {
    'first_name': {
      type: String,
      required: [true, 'First name is required']
    },
    'last_name': {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;