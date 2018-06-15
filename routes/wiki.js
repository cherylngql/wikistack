const express = require('express');
const router = express.Router();
const index = require('../views/index');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll({where:{}});
  res.send(index.main(pages));
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(index.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const someSlug = req.params.slug;
    const page = await Page.findOne({
      where: {slug: someSlug}
    });
    res.send(index.wikiPage(page));
  } catch (err) {next(err)}
});

// router.get('/search', async (res, res, next))

module.exports = router; // important!
