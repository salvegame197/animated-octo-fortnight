"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

class UserController {
  async index(req, res) {
    const users = await _user2.default.find({});

    return res.json(users);
  }
  async show(req, res) {
    const user = await _user2.default.findById(req.user);
    if (!user) {
      console.warn(`IP:${req.ip} GET/users Error on get user : ${user}`);
      res.status(401).json({ error: 'Failed on Authenticate' });
    }
    console.info(`IP:${req.ip}  GET/users : ${user}`);
    return res.json({ user: user.show() });
  }
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExist = await _user2.default.findOne({ email });
      if (userExist) {
        console.warn(
          `IP:${req.ip} POST/users Trying duplicate a user : ${JSON.stringify(
            req.body
          )}`
        );
        return res.status(400).json({ error: 'Duplicate User' });
      }
      const user = await _user2.default.create({
        name,
        email,
        password,
      });
      console.info(`IP:${req.ip} POST/users : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {
      console.info(`IP:${req.ip} POST/users ${error}`);
      res.status(400).json({ error: 'Failed on create user' });
    }
  }
  async update(req, res) {
    try {
      const user = await _user2.default.findById(req.user);
      const { name, email, password } = req.body;
      if (!user) {
        console.warn(
          `IP:${req.ip} PUT/users Failed on Authenticate : ${req.user}`
        );
        return res.status(401).json({ error: 'Failed on Authenticate' });
      }

      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }

      await user.save();
      console.info(`IP:${req.ip} PUT/users : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {}
  }

  async deleted(req, res) {
    const user = await _user2.default.findById(req.user);
    if (!user) {
      console.warn(
        `IP:${req.ip} DELETE/users Failed on Authenticate : ${req.user}`
      );
      res.status(401).json({ error: 'Failed on Authenticate' });
    }

    user.deleted = true;

    await user.save();
    console.info(`IP:${req.ip} DELETE/users : ${user}`);
    return res.status(204).send();
  }
}

exports. default = new UserController();
