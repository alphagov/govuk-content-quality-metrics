var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Metrics', function() {
  it('should return metrics for readability', function(done) {
    chai.request(server)
      .put('/metrics')
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
      .put('/metrics')
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
  it('should return metrics for equality too');
});
