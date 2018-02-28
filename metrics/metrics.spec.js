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
        content: 'Formula to detect the grade level of text according to the Flesch–Kincaid Grade Level.\n' +
          'Bluebird runs on a wide variety of browsers including older versions.'
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
                confidence: '6/7',
                actual: 'Formula to detect the grade level of text according to the Flesch–Kincaid Grade Level.'
              },
              {
                reason: 'Hard to read sentence (confidence: 6/7)',
                location: {
                  end: {
                    column: 70,
                    line: 2,
                    offset: 156
                  },
                  start: {
                    column: 1,
                    line: 2,
                    offset: 87
                  }
                },
                confidence: '6/7',
                actual: 'Bluebird runs on a wide variety of browsers including older versions.',
              }
            ],
            count: 2
          });
        done();
      })
  });
  it('should return metrics for grammar');
  it('should return metrics for equality too');
});
