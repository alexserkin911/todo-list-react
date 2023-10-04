const router = require('express').Router();
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const registerValidation = require('../validations/auth');
const { User } = require('../db/models');

router.get('/check', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, email, password: hashedPassword },
    });

    if (created) {
      const userSession = JSON.parse(JSON.stringify(user));
      delete userSession.password;
      req.session.user = userSession;
      return res.json(userSession);
    }
    return res
      .status(500)
      .json({ message: 'пользователь с таким email уже существует' });
  } catch (error) {
    return res.status(500).json({ message: 'не удалось зарегистрироваться' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const userSession = JSON.parse(JSON.stringify(user));
      delete userSession.password;
      req.session.user = userSession;
      return res.json(userSession);
    }
    return res.status(400).json({ message: 'неверный e-mail или password' });
  } catch (error) {
    return res.status(500).json({ message: 'не удалось авторизоваться' });
  }
});

router.get('/logout', (req, res) => {
  // req.session.destroy(() => {
  //   res.clearCookie('Todo_List');
  //   res.json({});
  // });
  req.session.destroy();
  res.clearCookie('Todo_List');
  res.sendStatus(200);
});

module.exports = router;
