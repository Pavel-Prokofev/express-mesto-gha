const usersRouter = require('express').Router();
const {
  createUser,
  returnAllUsers,
  returnUserById,
  userDataChange,
  userAvatarChange,
} = require('../controllers/users');

usersRouter.post('/', createUser);

usersRouter.get('/', returnAllUsers);

usersRouter.get('/:userId', returnUserById);

usersRouter.patch('/me', userDataChange);

usersRouter.patch('/me/avatar', userAvatarChange);

module.exports = usersRouter;
