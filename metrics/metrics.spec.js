/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Metrics', () => {
  it('should check for readability', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'Formula to detect the grade level of text according to the Flesch–Kincaid Grade Level.'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.readability_count).to.eq(1);
  });
  it('should check for passive voice', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'He was withheld while we were being fed.'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.passive_count).to.eq(2);
  });
  it('should check for spelling', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'Somethng spelt wrong'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.spell_count).to.eq(1);
  });
  it('should check for contractions', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'Something isnt right'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.contractions_count).to.eq(1);
  });
  it('should check for indefinite article', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'He should, a 8-year old boy, should have arrived a hour ago'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.indefinite_article_count).to.eq(2);
  });
  it('should check for redundant acronymns', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'Where can I find an ATM machine?'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.redundant_acronyms_count).to.eq(1);
  });
  it('should check for profanities', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'Who gives a rats arse?'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.profanities_count).to.eq(1);
  });
  it('should check for equality', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'I didn\'t want his opinion.'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.equality_count).to.eq(1);
  });
  it('should check for repeated words', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'I didn\'t want want to repeat that word.'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.repeated_words_count).to.eq(1);
  });
  it('should check for simpler alternatives', async () => {
    const res = await chai.request(server)
      .post('/metrics')
      .send({
        content: 'You can utilise a shorter word.'
      });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.simplify_count).to.eq(1);
  });
});
