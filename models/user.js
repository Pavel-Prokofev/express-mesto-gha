const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /(?:https?|ftp)(?::\/\/)(?:(?:[а-яa-z0-9]{1}[а-яa-z0-9-]*)\.){1,}(?:(?:(?:[a-z])+)|(?:(?:[а-я])+))(?:$|(?:\/(?:$|(?:[а-яa-z0-9#?]+[а-яa-z0-9._~:?#[\]@!$&'()*+,;=-]*))))*$/im.test(v),
      message: 'Неправильный формат почты',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then(async (user) => {
      if (!user) {
        const err = new Error();
        err.name = 'InvalidAuthorization';
        return Promise.reject(err);
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        const err = new Error();
        err.name = 'InvalidAuthorization';
        return Promise.reject(err);
      }
      return user;
    });
};

module.exports = mongoose.model('user', userSchema);
