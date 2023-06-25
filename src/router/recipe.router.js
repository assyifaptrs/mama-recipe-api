/* eslint-disable */
const express = require('express');
const router = express.Router();

const {
  store,
  detail,
  create,
  update,
  destroy,
  pagination,
  getByID,
  ascending,
  descending,
  searchByTitle,
  searchByCharacter,
} = require('../controller/recipe.controller');

const { hitAllRecipe } = require('../middleware/redis');
const upload = require('../middleware/upload');

//get recipe
router.get('/recipe', store);
router.get('/recipe-detail/:id', detail);

//sorting
router.get('/recipe-asc', ascending);
router.get('/recipe-desc', descending);

//searching
router.get('/recipe-title/:title', searchByTitle);
router.get('/recipe/:character', searchByCharacter);

//crud
router.post('/recipe', upload, create);
router.put('/recipe/update/:id', update);
router.delete('/recipe/delete/:id', destroy);

//pagination
router.get('/recipe-pagination', pagination);

//redis
router.get('/v1/getRecipeRedis/:id', hitAllRecipe, getByID);

module.exports = router;
