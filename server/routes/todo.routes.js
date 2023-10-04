const router = require('express').Router();

const { Task } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const allTasks = await Task.findAll({ where: { userId } });
    res.json(allTasks);
  } catch (error) {
    res.json({ error: 'no tasks' });
  }
});

router.get('/:id', async (req, res) => {
  let { limit, page } = req.query;
  page = page || 1;
  limit = limit || 5;
  const offset = page * limit - limit;
  const userId = req.session.user.id;
  try {
    const limitTask = await Task.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    res.json(limitTask);
  } catch (error) {
    res.json({ error: 'no limitTasks' });
  }
});

router.post('/', async (req, res) => {
  const { isDone, title, page } = req.body;
  const userId = req.session.user.id;
  const limit = 5;
  const offset = page * limit - limit;
  try {
    await Task.create({ isDone, title, userId });
    const limitTask = await Task.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    res.json(limitTask);
  } catch (error) {
    res.json({ error: 'no task' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let { page, limit } = req.query;
  page = page || 1;
  limit = limit || 5;
  const offset = page * limit - limit;
  const userId = req.session.user.id;
  try {
    await Task.destroy({ where: { id } });
    const limitTask = await Task.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    res.json(limitTask);
  } catch (error) {
    res.json({ 'no del': error });
  }
});

router.put('/', async (req, res) => {
  const { id, isDone, title } = req.body;
  try {
    const editTask = await Task.update({ isDone, title }, { where: { id } });
    res.json(editTask);
  } catch (error) {
    res.json({ 'no put': error });
  }
});

module.exports = router;
