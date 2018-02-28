const express = require('express')
const path = require('path')
const metrics = require('./metrics/metrics');
const bodyParser = require('body-parser');

const app = express()
  .use(bodyParser.json())
  .use('/', metrics);

module.exports = app;
