const Card = require('../models/card');
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

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.status(statusCreatingOk).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(statusValidationError).send({ message: messageValidationErrorData });
      } else {
        res.status(statusServerError).send({ message: messageServerError });
      }
    });
};

const returnAllCards = (req, res) => {
  Card.find({})
    .then((allCards) => res.status(statusAllGood).send(allCards))
    .catch(() => res.status(statusServerError).send({ message: messageServerError }));
};

const dellCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error(messageNotFoundError);
      err.statusCode = statusNotFoundError;
      err.name = 'NotFound';
      throw err;
    })
    .then(() => res.status(statusAllGood).send({ message: 'Карточка удалена.' }))
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error(messageNotFoundError);
      err.statusCode = statusNotFoundError;
      err.name = 'NotFound';
      throw err;
    })
    .then(() => res.status(statusAllGood).send({ message: 'Лайк добавлен' }))
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error(messageNotFoundError);
      err.statusCode = statusNotFoundError;
      err.name = 'NotFound';
      throw err;
    })
    .then(() => res.status(statusAllGood).send({ message: 'Лайк удалён' }))
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

module.exports = {
  createCard,
  returnAllCards,
  dellCardById,
  likeCard,
  dislikeCard,
};
