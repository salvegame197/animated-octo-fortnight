"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('./config/dotenv');
require('./database/mongodb');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _auth = require('./routes/auth'); var _auth2 = _interopRequireDefault(_auth);
var _recovery = require('./routes/recovery'); var _recovery2 = _interopRequireDefault(_recovery);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/', _home2.default);
    this.app.use('/user', _user2.default);
    this.app.use('/auth', _auth2.default);
    this.app.use('/recovery', _recovery2.default);
  }
}

exports. default = new App().app;
