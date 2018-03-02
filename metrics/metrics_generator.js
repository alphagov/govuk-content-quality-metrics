const Promise = require("bluebird");
const retext = Promise.promisifyAll(require('retext'));
const readability = require('retext-readability');
const passive = require('retext-passive');
const dictionary = require('dictionary-en-gb');
const spell = require('retext-spell');
const contractions = require('retext-contractions');
const indefinateArticle = require('retext-indefinite-article');
const redundantAcronyms = require('retext-redundant-acronyms');
const repeated = require('retext-repeated-words');
const profanities = require('retext-profanities');
const equality = require('retext-equality');

const _ = require('lodash');

function getName(name) {
  return _.replace(name, 'retext-', '').replace('-', '_')
};

function generate(text) {
  return retext()
    .use(readability, {
      age: 9
    })
    .use(contractions)
    .use(equality)
    .use(indefinateArticle)
    .use(passive)
    .use(profanities)
    .use(redundantAcronyms)
    .use(repeated)
    .use(spell, dictionary)
    .process(text)
    .then(transformResults);
};

function transformResults(results) {
  return _.chain(results.messages)
    .groupBy(res => getName(res.source))
    .mapValues(createEntry)
    .value();
};

function createEntry(src) {
  return {
    messages: _.map(src, mapEntry),
    count: src.length
  }
};

function mapEntry(src) {
  return {
    actual: src.actual,
    reason: src.message,
    location: src.location
  };
};

module.exports = generate;
