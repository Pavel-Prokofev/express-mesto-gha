const statusAllGood = 200;
const statusCreatingOk = 201;
const statusValidationError = 400;
const messageValidationErrorData = 'Переданы некорректные данные';
const statusCastError = 400;
const messageCastErrorId = 'Передан некорректнй id';
const statusNotFoundError = 404;
const messageNotFoundError = 'по указанному _id ничего не найдено';
const statusServerError = 500;
const messageServerError = 'На сервере произошла ошибка';

module.exports = {
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
};
