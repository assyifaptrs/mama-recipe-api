/* eslint-disable */
const express = require('express');
const router = express.Router();
const {
  store,
  detail,
  register,
  login,
  update,
  destroy,
  pagination,
  getByID,
  ascending,
  descending,
  searchByName,
  searchByCharacter,
  myRecipe,
  loginData,
} = require('../controller/user.controller');

const { hitAllUser } = require('../middleware/redis');
const upload = require('../middleware/upload');
const auth = require('../middleware/staticAuth');
const { isAdmin, isCustomer } = require('../middleware/authorization');

//get user
router.get('/user', store);
router.get('/detail/:id', detail);

//sorting
router.get('/user-asc', ascending);
router.get('/user-desc', descending);

//searching
router.get('/name/:name', searchByName);
router.get('/user/:character', searchByCharacter);

//crud
router.post('/register', upload, register);
router.post('/login', login);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

//pagination
router.get('/pagination', pagination);

//get redis
router.get('/v1/getUserRedis/:id', hitAllUser, getByID);

//other routes
router.get('/login-data', loginData);
// router.get('/login-data', isAdmin, loginData);
router.get('/myrecipe', myRecipe);

module.exports = router;
