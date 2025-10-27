const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const { validate } = require('../middleware/validator');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), authCtrl.register);
router.post('/login', validate(loginSchema), authCtrl.login);

module.exports = router;
