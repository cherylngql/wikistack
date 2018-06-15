const express = require('express');
const router = express.Router();
const index = require('../views/index');

router.get('/', (req, res, next) => {
  res.send(index.layout('Hello world!'));
});

module.exports = router; // important!
