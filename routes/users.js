const express = require('express');
const router = express.Router();
const index = require('../views/index');
const { User } = require('../models');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(index.userList(users));
  } catch (err) {next(err)}
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({where: {
      id: id
    }});
    const pages = await Page.findAll({
      where: {authorId: user.id}
    });
    res.send(index.userPages(user, pages));
  } catch (err) {next(err)}
});

router.post('/', (req, res, next) => {
  res.send('this posts');
});

router.put('/:id', (req, res, next) => {
  res.send(`this updates user ${id}`);
});

router.delete('/:id', (req, res, next) => {
  res.send(`this deletes user ${id}`);
});

module.exports = router; // important!
