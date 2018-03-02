var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Metrics', function() {
  it('should return metrics for readability', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'Formula to detect the grade level of text according to the Flesch–Kincaid Grade Level.'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.readability).to
          .deep.eq({
            messages: [{
              reason: 'Hard to read sentence (confidence: 6/7)',
              location: {
                end: {
                  column: 87,
                  line: 1,
                  offset: 86
                },
                start: {
                  column: 1,
                  line: 1,
                  offset: 0
                }
              },
              actual: 'Formula to detect the grade level of text according to the Flesch–Kincaid Grade Level.'
            }],
            count: 1
          });
        done();
      })
  });
  it('should return metrics for passive', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'He was withheld while we were being fed.'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.passive).to
          .deep.eq({
            messages: [{
                actual: 'withheld',
                reason: 'Don’t use the passive voice',
                location: {
                  start: {
                    line: 1,
                    column: 8,
                    offset: 7
                  },
                  end: {
                    line: 1,
                    column: 16,
                    offset: 15
                  }
                },
              },
              {
                actual: 'fed',
                reason: 'Don’t use the passive voice',
                location: {
                  start: {
                    line: 1,
                    column: 37,
                    offset: 36
                  },
                  end: {
                    line: 1,
                    column: 40,
                    offset: 39
                  }
                },
              }
            ],
            count: 2
          });
        done();
      })
  });
  it('should return metrics for spelling', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'Somethng spelt wrong'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.spell).to
          .deep.eq({
            messages: [{
              actual: 'Somethng',
              reason: '`Somethng` is misspelt; did you mean `Something`?',
              location: {
                start: {
                  line: 1,
                  column: 1,
                  offset: 0
                },
                end: {
                  line: 1,
                  column: 9,
                  offset: 8
                }
              }
            }],
            count: 1
          });
        done();
      })
  });
  it('should return metrics for contractions', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'Something isnt right'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.contractions).to
          .deep.eq({
            messages: [{
              actual: 'isnt',
              reason: 'Expected an apostrophe in `isnt`, like this: `isn’t`',
              location: {
                start: {
                  line: 1,
                  column: 11,
                  offset: 10
                },
                end: {
                  line: 1,
                  column: 15,
                  offset: 14
                }
              }
            }],
            count: 1
          });
        done();
      })
  });
  it('should return metrics for indefinite article', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'He should, a 8-year old boy, should have arrived a hour ago'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.indefinite_article).to
          .deep.eq({
            messages: [{
                actual: 'a',
                reason: 'Use `an` before `8-year`, not `a`',
                location: {
                  start: {
                    line: 1,
                    column: 12,
                    offset: 11
                  },
                  end: {
                    line: 1,
                    column: 13,
                    offset: 12
                  }
                }
              },
              {
                actual: 'a',
                reason: 'Use `an` before `hour`, not `a`',
                location: {
                  start: {
                    line: 1,
                    column: 50,
                    offset: 49
                  },
                  end: {
                    line: 1,
                    column: 51,
                    offset: 50
                  }
                }
              }
            ],
            count: 2
          });
        done();
      })
  });
  it('should return metrics for redundant acronymns', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'Where can I find an ATM machine?'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.redundant_acronyms).to
          .deep.eq({
            messages: [{
              actual: 'ATM machine',
              reason: 'Replace `ATM machine` with `ATM`',
              location: {
                start: {
                  line: 1,
                  column: 21,
                  offset: 20
                },
                end: {
                  line: 1,
                  column: 32,
                  offset: 31
                }
              }
            }],
            count: 1
          });
        done();
      })
  });
  it('should return metrics for profanities', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: 'Who gives a rats arse?'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.profanities).to
          .deep.eq({
            messages: [{
              actual: 'arse',
              reason: 'Don’t use “arse”, it’s profane',
              location: {
                start: {
                  line: 1,
                  column: 18,
                  offset: 17
                },
                end: {
                  line: 1,
                  column: 22,
                  offset: 21
                }
              }
            }],
            count: 1
          });
        done();
      })
  });
  it('should return metrics for equality', function(done) {
    chai.request(server)
      .post('/metrics')
      .send({
        content: "I didn't want his opinion."
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.equality).to
          .deep.eq({
            messages: [{
              reason: '`his` may be insensitive, use `their`, `theirs`, `them` instead',
              location: {
                start: {
                  line: 1,
                  column: 15,
                  offset: 14
                },
                end: {
                  line: 1,
                  column: 18,
                  offset: 17
                }
              }
            }],
            count: 1
          });
        done();
      })
  });
});
