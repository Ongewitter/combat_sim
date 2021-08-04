var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (_req, res, next) =>
  res.render('index', { title: 'Express' })
);

/* GET Helloworld page. */
router.get('/helloworld', (_req, res, next) =>
  res.render('helloworld', { title: 'Hello World' })
);

module.exports = router;
