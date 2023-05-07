const jwt = require('jsonwebtoken');

const { orFailFunction } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(orFailFunction('InvalidAuthorizationJwt'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'some-superSecret-key');
      req.user = payload;
      next();
    } catch (error) {
      next(orFailFunction('InvalidAuthorizationJwt'));
    }
  }
};
