/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');
const User = require('../../db/db-repo').User;

describe('routes : index', () => {
  before(() => {
    return User.findOne({where: {userName: 'su'}})
      .then(user => user.destroy())
      .then(console.log('I am gone'))
      .catch(err => console.log(err));
  });
  after(() => console.log('well done'));
  describe('POST /register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/register')
        .send({
          username: 'su',
          password: 'asd123',
          email: '123@123.com'
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

  describe('POST /login', () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post('/login')
        .send({
          username: '1234@123.com',
          password: 'asd123'
        })
        .end((err, res) => {
          console.log(err);
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
  });
});
