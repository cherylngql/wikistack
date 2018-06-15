const express = require('express');
const router = express.Router();
const index = require('../views/index');

router.get('/', (req, res, next) => {
  res.send('this directs to /users');
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.send(`this directs to /users/${id}`);
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
