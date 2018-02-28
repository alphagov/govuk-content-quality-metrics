const retext = require('retext');
const readability = require('retext-readability');
const _ = require('lodash')

function getName(name){
  return _.replace(name, 'retext-', '')
};

function mapEntry(src){
  return {
    actual: src.actual,
    reason: src.message,
    location: src.location,
    confidence: src.confidence
  }
}

function createEntry(src){
  return {
    messages: _.map(src, mapEntry),
    count: src.length
  }
};

function transformResults(results) {
  return _.chain(results)
          .groupBy(res => getName(res.source))
          .mapValues(createEntry)
          .value();
};

function generate(text) {
  var results;
  retext()
    .use(readability, {
      age: 9
    })
    .process(text, function(err, file) {
      results = transformResults(file.messages);
    });
  console.debug(results);
  return results;
};

module.exports = generate;
