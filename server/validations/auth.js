const { body } = require('express-validator');

const registerValidation = [
  body('name', 'имя должно быть минимум 6 символов').isLength({ min: 6 }),
  body('email', 'неверный формат почты').isEmail().isLength({ min: 6 }),
  body('password', 'пароль должен быть минимум 6 символов').isLength({
    min: 6,
  }),
];

module.exports = registerValidation;
