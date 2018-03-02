const Promise = require('bluebird');

// eslint-disable-next-line no-use-extend-native/no-use-extend-native
const retext = Promise.promisifyAll(require('retext'));

const contractions = require('retext-contractions');
const dictionary = require('dictionary-en-gb');
const equality = require('retext-equality');
const indefinateArticle = require('retext-indefinite-article');
const passive = require('retext-passive');
const profanities = require('retext-profanities');
const redundantAcronyms = require('retext-redundant-acronyms');
const readability = require('retext-readability');
const repeated = require('retext-repeated-words');
const simplify = require('retext-simplify');
const spell = require('retext-spell');

const _ = require('lodash');

function getName(name) {
  return _.replace(name, 'retext-', '').replace('-', '_');
}

async function generate(text) {
  try {
    return transformResults(await retext()
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
      .use(simplify)
      .use(spell, dictionary)
      .process(text));
  } catch (err) {
    console.dir(err, {
      depth: null
    });
  }
}

function transformResults(results) {
  return _.chain(results.messages)
    .groupBy(res => getName(res.source))
    .mapValues(createEntry)
    .value();
}

function createEntry(src) {
  return {
    messages: _.map(src, mapEntry),
    count: src.length
  };
}

function mapEntry(src) {
  return {
    actual: src.actual,
    reason: src.message,
    location: src.location
  };
}

module.exports = generate;
