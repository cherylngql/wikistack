const express = require('express');
const router = express.Router();
const index = require('../views/index');
const { Page } = require('../models');
const { User } = require('../models');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll({where:{}});
  res.send(index.main(pages));
});

router.post('/', async (req, res, next) => {
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const page = await Page.create(req.body);
    const users = await User.findOrCreate({
      where: {
        name: req.body.author, // cannot use page.author because our schema doesn't have author for page
        email: req.body.email
      }
    });
    const user = users[0];
    page.setAuthor(user);
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
    const user = await page.getAuthor();
    res.send(index.wikiPage(page, user));
  } catch (err) {next(err)}
});

// router.get('/search', async (res, res, next))

module.exports = router; // important!
