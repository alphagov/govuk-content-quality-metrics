const express = require('express');
const bodyParser = require('body-parser');
const metrics = require('./metrics/metrics');

const app = express()
  .use(bodyParser.json())
  .use('/', metrics);

module.exports = app;
