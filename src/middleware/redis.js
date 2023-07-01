const client = require('../config/redis');

const hitAllUser = async (req, res, next) => {
  const id = req.params.id;
  let result;
  try {
    const users = await client.get(`getFromRedis/${id}`);
    console.log(users);
    if (users) {
      result = JSON.parse(users);
      res.send({
        fromCache: true,
        data: result,
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(404);
  }
};

const hitAllRecipe = async (req, res, next) => {
  const id = req.params.id;
  let result;
  try {
    const recipes = await client.get(`getFromRedis/${id}`);

    if (recipes) {
      result = JSON.parse(recipes);
      res.send({
        fromCache: true,
        data: result,
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(404);
  }
};

module.exports = {
  hitAllUser,
  hitAllRecipe,
};
