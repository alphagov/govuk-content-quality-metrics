const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const generate = require('./metrics-generator');

router.post('/metrics', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const results = await generate(req.body.content);
    res.json(results);
  } catch (err) {
    console.dir(err, {depth: null});
  }
});

module.exports = router;
