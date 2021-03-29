"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserControllers = require('../controllers/UserControllers'); var _UserControllers2 = _interopRequireDefault(_UserControllers);
var _checkCredentials = require('../middlewares/checkCredentials'); var _checkCredentials2 = _interopRequireDefault(_checkCredentials);

const router = new (0, _express.Router)();

router.post('/', _UserControllers2.default.store);

router.get('/', _checkCredentials2.default, _UserControllers2.default.show);
router.put('/', _checkCredentials2.default, _UserControllers2.default.update);
router.delete('/', _checkCredentials2.default, _UserControllers2.default.deleted);

exports. default = router;
