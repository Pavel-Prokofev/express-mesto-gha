const usersRouter = require('express').Router();

const auth = require('../middlewares/auth');
const {
  login,
  createUser,
  returnAllUsers,
  returnThisUser,
  returnUserById,
  userDataChange,
  userAvatarChange,
} = require('../controllers/users');
const {
  createUserValidation,
  loginValidation,
  returnUserByIdValidation,
  userDataChangeValidation,
  userAvatarChangeValidation,
} = require('../middlewares/validationJoi');

usersRouter.post('/signup', createUserValidation, createUser);

usersRouter.post('/signin', loginValidation, login);

usersRouter.use(auth);

usersRouter.get('/', returnAllUsers);

usersRouter.get('/me', returnThisUser);

usersRouter.get('/:userId', returnUserByIdValidation, returnUserById);

usersRouter.patch('/me', userDataChangeValidation, userDataChange);

usersRouter.patch('/me/avatar', userAvatarChangeValidation, userAvatarChange);

module.exports = usersRouter;
