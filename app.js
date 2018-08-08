const express = require('express');
const bodyParser = require('body-parser');
const metrics = require('./metrics/metrics');

const app = express()
  .use(bodyParser.json({limit: '50mb'}))
  .use('/', metrics);

module.exports = app;
