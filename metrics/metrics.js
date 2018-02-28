var express = require('express');
var router = express.Router();
var generate = require('./metrics_generator')

router.put('/metrics', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json(generate(req.body.content));
});

module.exports = router;
