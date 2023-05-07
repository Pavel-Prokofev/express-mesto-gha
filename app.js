const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const {
  orFailFunction,
  identificationError,
} = require('./utils/errors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.log('Ошибка подключения:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', (req, res, next) => {
  next(orFailFunction('NotFoundUrl'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const currentErr = identificationError(err);
  res.status(currentErr.statusCode).send({ message: currentErr.message });
  next();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Ошибка запуска сервера');
  } else {
    console.log(`Сервер успешно запущен на порте: ${PORT}`);
  }
});
