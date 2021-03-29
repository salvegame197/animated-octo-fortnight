"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AuthControllers = require('../controllers/AuthControllers'); var _AuthControllers2 = _interopRequireDefault(_AuthControllers);

const router = new (0, _express.Router)();

router.post('/', _AuthControllers2.default.store);

exports. default = router;
