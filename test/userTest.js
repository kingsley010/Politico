import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import inputs from './seed/user.data';

chai.use(chaiHttp);
const { should, expect } = chai;
should();
export const request = supertest(app);

export const wrongToken = 'ThisIsAWrongToken';

const userToken = { token: null };

describe('signUp test cases', () => {
  describe('/POST api/v1/auth/signup', () => {
    it('should return `400` if some fields are undefined', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(inputs.emptyData)
        .expect(400)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(400);
          done(err);
        });
    });
  });
  describe('/POST api/v1/auth/signup', () => {
    it('Should return `400` if password is not hashed', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(400)
        .end((err, res) => {
          expect(res.body.password).to.equal(undefined);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  it('should return sign up user successfully', (done) => {
    const user = {
        firstname: 'Ben', lastname: 'Jone', othername: 'Barry', email: 'abca@gmail.com', password: '12345', phonenumber: '12345678901', passporturl: 'red.jpeg', isAdmin: 'false', registered: 'Date.now()', updated: 'Date.now()'
    };
    request.post('/api/v1/auth/signup')
      .send(user)
      .expect(500)
      .end((err, res) => {
        expect(res.body.status).to.equal(500);
        done(err);
      });
});
  describe('/POST api/v1/auth/signup', () => {
    it('should return `400` status code with errors message for empty request', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(inputs.emptyData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.firstname).to.eql(undefined);
          expect(res.body.lastname).to.eql(undefined);
          expect(res.body.email).to.eql(undefined);
          expect(res.body.password).to.eql(undefined);
          expect(res.body.phonenumber).to.eql(undefined);
          expect(res.body.passporturl).to.eql(undefined);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('LogIn', () => {
    it('Should return `404` for empty user input', (done) => {
      request.post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send(inputs.invalidEmailPassword)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Should return `404` and deny access if wrong userName is not entered', (done) => {
      request.post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send(inputs.noEmail)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Should return `404` and deny access if wrong Password is not entered', (done) => {
      request.post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send(inputs.noPassword)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});

export default userToken;
