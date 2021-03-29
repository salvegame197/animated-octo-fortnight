"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _RecoveryController = require('../controllers/RecoveryController'); var _RecoveryController2 = _interopRequireDefault(_RecoveryController);

const router = new (0, _express.Router)();

router.post('/', _RecoveryController2.default.store);
router.put('/', _RecoveryController2.default.update);

exports. default = router;
