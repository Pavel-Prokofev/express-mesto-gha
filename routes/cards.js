const cardsRouter = require('express').Router();
const {
  createCard,
  returnAllCards,
  dellCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', createCard);

cardsRouter.get('/', returnAllCards);

cardsRouter.delete('/:cardId', dellCardById);

cardsRouter.put('/:cardId/likes', likeCard);

cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
