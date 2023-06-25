/* eslint-disable */
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateSecret');
const clientRedis = require('../config/redis');
const { response, responseError } = require('../helper/response.js');

const userController = {
  store: (req, res) => {
    userModel
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
    const getUser = await userModel.selectDetail(id);
    try {
      response(res, getUser.rows, 200, 'success');
    } catch (err) {
      responseError(res, err, 400, 'data error');
    }
  },

  register: async (req, res) => {
    const { id, name, email, phone, password } = req.body;
    console.log(req.body);
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.json({
          message: 'failed hash password',
        });
      }
      const data = {
        id,
        name,
        email,
        phone,
        password: hash,
        level: 0,
        image: null,
      };
      userModel
        .registerUser(data)
        .then((result) => {
          res.json({
            message: 'register success',
            result,
          });
        })
        .catch((err) => {
          response(res, err, 400, 'data error');
        });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    userModel
      .loginUser(email)
      .then((data) => {
        if (data.rowCount > 0) {
          bcrypt
            .compare(password, data.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  ...data.rows[0],
                });
                res.json({
                  message: 'login successful',
                  token,
                });
              } else {
                res.json({
                  message: 'your password is wrong',
                });
              }
            });
        } else {
          res.json({
            message: 'your email or password is wrong',
          });
        }
      })
      .catch((err) => {
        responseError(res, err, 400, 'data error');
      });
  },

  update: (req, res) => {
    const id = req.params.id;
    const { name, email, phone, password, level } = req.body;
    const data = {
      id,
      name,
      email,
      phone,
      password,
      level,
    };
    userModel
      .update(data)
      .then((result) => {
        res.json({
          message: 'update success',
          data: result,
        });
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  destroy: (req, res) => {
    const { id } = req.params;
    userModel
      .delete(id)
      .then((result) => {
        res.json({
          message: 'delete success',
          data: result,
        });
      })
      .catch((err) => {
        responseError(res, err, 400, 'data error');
      });
  },

  pagination: (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    userModel.paginate(limitValue, offsetValue).then((result) => {
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
    userModel
      .selectDetail(id)
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
    userModel
      .sortAsc()
      .then((result) => {
        response(res, result.rows, 200, 'success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  descending: (req, res) => {
    userModel
      .sortDesc()
      .then((result) => {
        response(res, result.rows, 200, 'success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  searchByName: async (req, res) => {
    const name = req.params.name;
    const getUser = await userModel.searchByName(name);
    try {
      response(res, getUser.rows, 200, 'success');
    } catch (err) {
      response(res, err, 400, 'data error');
    }
  },

  searchByCharacter: async (req, res) => {
    const character = req.params.character;
    const getUser = await userModel.searchByCharacter(character);
    try {
      response(res, getUser.rows, 200, 'success');
    } catch (err) {
      response(res, err, 400, 'data error');
    }
  },

  loginData: (req, res) => {
    userModel
      .loginData()
      .then((result) => {
        response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },

  myRecipe: (req, res) => {
    userModel
      .myRecipe()
      .then((result) => {
        response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => {
        response(res, err, 400, 'data error');
      });
  },
};

module.exports = userController;
