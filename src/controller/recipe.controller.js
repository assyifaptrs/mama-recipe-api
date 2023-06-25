/* eslint-disable */
const recipeModel = require('../model/recipe.model');
const { response } = require('../helper/response.js');

const recipeController = {
  store: (req, res) => {
    recipeModel
      .selectAll()
      .then((result) => {
        response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  detail: async (req, res) => {
    const id = req.params.id;
    const getRecipe = await recipeModel.selectDetail(id);
    try {
      response(res, getRecipe.rows, 200, 'success');
    } catch (err) {
      responseError(res, err, 400, 'data error');
    }
  },

  create: (req, res) => {
    const { id, title, ingredients, image, video } = req.body;
    const data = {
      id,
      title,
      ingredients,
      image,
      video,
    };
    recipeModel
      .createRecipe(data)
      .then((result) => {
        res.json({
          message: 'POST DATA SUCCESS',
          result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  update: (req, res) => {
    const id = req.params.id;
    const { title, ingredients } = req.body;
    const data = {
      id,
      title,
      ingredients,
    };
    recipeModel
      .updateRecipe(data)
      .then((result) => {
        res.json({
          message: 'update success',
          data: result,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  destroy: (req, res) => {
    const { id } = req.params;
    recipeModel
      .deleteRecipe(id)
      .then((result) => {
        res.json({
          message: 'delete success',
          data: result,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  pagination: (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    recipeModel.paginate(limitValue, offsetValue).then((result) => {
      const pagination = {
        currentPage: pageValue,
        dataperPage: limitValue,
      };
      response(res, result.rows, 200, 'success', pagination);
    });
  },

  // redis
  getByID: (req, res) => {
    const id = req.params.id;
    const { title, ingredients } = req.body;
    const data = {
      id,
      title,
      ingredients,
    };
    recipeModel
      .selectDetail(data)
      .then((result) => {
        console.log(id);
        const dataRedis = clientRedis.set(
          `getFromRedis/${id}`,
          JSON.stringify(result),
          {
            EX: 180,
            NX: true,
          }
        );
        res.send({
          fromCache: false,
          data: dataRedis,
        });
      })
      .catch((err) => {
        responseError(res, err.message, 400, 'Get ID Failed');
      });
  },

  ascending: (req, res) => {
    recipeModel
      .sortAsc()
      .then((result) => {
        response(res, result.rows, 200, 'success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  descending: (req, res) => {
    recipeModel
      .sortDesc()
      .then((result) => {
        response(res, result.rows, 200, 'success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  searchByTitle: async (req, res) => {
    const title = req.params.title;
    const getRecipe = await recipeModel.searchByTitle(title);
    try {
      response(res, getRecipe.rows, 200, 'success');
    } catch (err) {
      response(res, err, 400, 'data error');
    }
  },

  searchByCharacter: async (req, res) => {
    const character = req.params.character;
    const getRecipe = await recipeModel.searchByCharacter(character);
    try {
      response(res, getRecipe.rows, 200, 'success');
    } catch (err) {
      response(res, err, 400, 'data error');
    }
  },
};

module.exports = recipeController;
