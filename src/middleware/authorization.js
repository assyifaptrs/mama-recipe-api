/* eslint-disable */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { responseError } = require('../helper/response');

module.exports = {
  isAdmin: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      //verifikasi token jwt
      if (err) return res.sendStatus(403);
      req.email = decoded.email;

      if (decoded.level !== 'admin') return res.sendStatus(403);
      next();
    });
  },

  isCostumer: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;

      if (decoded.level !== 'guest')
        return res.sendStatus(403).json({ level: decoded.level });
      next();
    });
  },
};
