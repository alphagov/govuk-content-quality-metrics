var express = require('express');
var router = express.Router();
var generate = require('./metrics_generator')

router.post('/metrics', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  generate(req.body.content)
    .then((results) => res.json(results))
    .catch((err) => console.dir(err,  { depth: null }))
});

module.exports = router;
