const statusCreatingOk = 201;

const ValidationError = new Error('Переданы некорректные данные.');
ValidationError.statusCode = 400;
ValidationError.name = 'ValidationError';

const CastError = new Error('Передан некорректнй id.');
CastError.statusCode = 400;
CastError.name = 'CastError';

const InvalidAuthorization = new Error('Неверные почта или пароль.');
InvalidAuthorization.statusCode = 401;
InvalidAuthorization.name = 'InvalidAuthorization';

const InvalidAuthorizationJwt = new Error('Необходима авторизация');
InvalidAuthorizationJwt.statusCode = 401;
InvalidAuthorizationJwt.name = 'InvalidAuthorizationJwt';

const Forbidden = new Error('У вас нет прав на удаление этой карточки');
Forbidden.statusCode = 403;
Forbidden.name = 'Forbidden';

const NotFoundError = new Error('По указанному _id ничего не найдено.');
NotFoundError.statusCode = 404;
NotFoundError.name = 'NotFound';

const NotFoundUrlError = new Error('Неверный URl запроса.');
NotFoundUrlError.statusCode = 404;
NotFoundUrlError.name = 'NotFoundUrl';

const EmailNotUnique = new Error('Такая почта уже зарегистрирована.');
EmailNotUnique.statusCode = 409;
EmailNotUnique.name = 'EmailNotUnique';

const ServerError = new Error('На сервере произошла ошибка.');
ServerError.statusCode = 500;

const orFailFunction = (errName) => {
  const err = new Error();
  err.name = errName;
  return err;
};

const identificationError = (err) => {
  if (err.name === 'ValidationError') {
    return ValidationError;
  }
  if (err.name === 'CastError') {
    return CastError;
  }
  if (err.name === 'InvalidAuthorization') {
    return InvalidAuthorization;
  }
  if (err.name === 'InvalidAuthorizationJwt') {
    return InvalidAuthorizationJwt;
  }
  if (err.name === 'Forbidden') {
    return Forbidden;
  }
  if (err.name === 'NotFound') {
    return NotFoundError;
  }
  if (err.name === 'NotFoundUrl') {
    return NotFoundUrlError;
  }
  if (err.code === 11000) {
    return EmailNotUnique;
  }
  return ServerError;
};

module.exports = {
  statusCreatingOk,
  orFailFunction,
  identificationError,
};
