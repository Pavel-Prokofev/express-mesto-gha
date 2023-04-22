const User = require('../models/user');
const {
  statusAllGood,
  statusCreatingOk,
  statusValidationError,
  messageValidationErrorData,
  statusCastError,
  messageCastErrorId,
  statusNotFoundError,
  messageNotFoundError,
  statusServerError,
  messageServerError,
} = require('../utils/errorConstants');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.status(statusCreatingOk).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(statusValidationError).send({ message: messageValidationErrorData });
      } else {
        res.status(statusServerError).send({ message: messageServerError });
      }
    });
};

const returnAllUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.status(statusAllGood).send(allUsers))
    .catch(() => res.status(statusServerError).send({ message: messageServerError }));
};

const returnUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error(messageNotFoundError);
      err.statusCode = statusNotFoundError;
      err.name = 'NotFound';
      throw err;
    })
    .then((user) => res.status(statusAllGood).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(statusCastError).send({ message: messageCastErrorId });
      } else if (err.name === 'NotFound') {
        res.status(statusNotFoundError).send({ message: err.message });
      } else {
        res.status(statusServerError).send({ message: messageServerError });
      }
    });
};

const userDataChange = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const err = new Error(messageNotFoundError);
      err.statusCode = statusNotFoundError;
      err.name = 'NotFound';
      throw err;
    })
    .then((user) => res.status(statusAllGood).send(user.avatar))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(statusCastError).send({ message: messageCastErrorId });
      } else if (err.name === 'NotFound') {
        res.status(statusNotFoundError).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(statusValidationError).send({ message: messageValidationErrorData });
      } else {
        res.status(statusServerError).send({ message: messageServerError });
      }
    });
};

const userAvatarChange = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const err = new Error(messageNotFoundError);
      err.statusCode = statusNotFoundError;
      err.name = 'NotFound';
      throw err;
    })
    .then((user) => res.status(statusAllGood).send(user.avatar))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(statusNotFoundError).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(statusCastError).send({ message: messageCastErrorId });
      } else if (err.name === 'ValidationError') {
        res.status(statusValidationError).send({ message: messageValidationErrorData });
      } else {
        res.status(statusServerError).send({ message: messageServerError });
      }
    });
};

module.exports = {
  createUser,
  returnAllUsers,
  returnUserById,
  userDataChange,
  userAvatarChange,
};
