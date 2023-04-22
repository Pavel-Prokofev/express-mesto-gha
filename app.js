const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { statusNotFoundError } = require('./utils/errorConstants');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.log('Ошибка подключения:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64405412ba9737fcab3ed86c',
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(statusNotFoundError).send({ message: 'Неверный URl запроса.' });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Ошибка запуска сервера');
  } else {
    console.log(`Сервер успешно запущен на порте: ${PORT}`);
  }
});
