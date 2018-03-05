process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');
const User = require('../../db/db-repo').User;

describe('POST /register', () => {
  it('should register a new user', (done) => {
    chai.request(server)
      .post('/register')
      .send({
        username: 'su',
        password: 'asd123'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
  });
});
