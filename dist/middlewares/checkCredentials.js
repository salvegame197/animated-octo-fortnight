"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _jsonwebtoken = require('jsonwebtoken');
var _jwt = require('../config/jwt'); var _jwt2 = _interopRequireDefault(_jwt);

exports. default = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error(`IP:${req.ip} Token does not found`);
    return res.status(401).json({ error: 'Token does not found' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await _jsonwebtoken.verify.call(void 0, token, _jwt2.default.secret);
    const id = decoded.sub;

    const user = await _user2.default.findById(id);
    if (user.deleted === true) {
      console.error(`IP:${req.ip} | User:${user} Disabled User`);
      return res.status(401).json({ error: 'Disabled User' });
    }

    req.user = id;
    return next();
  } catch (error) {
    console.warn(`IP:${req.ip} Error ${error}`);
    return res.status(401).json({ error: 'Invalid JWT Token' });
  }
}
