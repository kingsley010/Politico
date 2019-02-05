import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../app';

let token;

describe('POST Requests', () => {

    describe ('POST /api/v1/auth/signup', () => {
      it('should create a new user', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'King',
            lastname: 'kaka',
            othername: 'macho',
            email: 'machoman@gmail.com',
            phonenumber: '10987654321',
            password: 'qwertyuiop',
            passporturl: 'kaks.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0].user.firstname).to.equal('King');
            token = res.body.data[0].token;
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should catch an existing email', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'King',
            lastname: 'kaka',
            othername: 'macho',
            email: 'machoman@gmail.com',
            phonenumber: '10987654321',
            password: 'qwertyuiop',
            passporturl: 'kaks.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 409, error: 'email aleady exists, please choose another email' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should catch an existing phone number', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Kingsley',
            lastname: 'Perfect',
            othername: 'Kaka',
            email: 'boy@gmail.com',
            phonenumber: '10987654321',
            password: 'qwertyuiop',
            passporturl: 'kaks.jpg',            
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body).to.be.an('object');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty firstname field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: ' ',
            lastname: 'Mark',
            othername: 'Gary',
            email: 'kakam@gmail.com',
            phonenumber: '75839202398384',
            passporturl: 'madoyayaa.jpg',
            password: '123540686',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 400, error: 'Firstname field is required' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for invalid passport', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mark',
            lastname: 'Mark',
            othername: 'Gary',
            email: 'kakam@gmail.com',
            phonenumber: '75839202398384',
            passporturl: 'madoyayaa',
            password: '123540686',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 400, error: 'Please include a valid passport' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty lastname field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mark',
            lastname: '  ',
            othername: 'Gary',
            email: 'ka@gmail.com',
            phonenumber: '75839202475868',
            passporturl: 'madoyayaa.jpg',
            password: '123540686',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 400, error: 'Lastname field is required' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty email field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Louis',
            lastname: 'Mark',
            othername: 'Mec',
            email: '  ',
            phonenumber: '75839202398384',
            passporturl: 'madoyayaa.jpg',
            password: '123540686',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 400, error: 'Email field is required' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty password field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Louis',
            lastname: 'Mark',
            othername: 'Mec',
            email: 'kalu@gmail.com',
            phonenumber: '75839202395098',
            passporturl: 'madoyayaa.jpg',
            password: '  ',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 400, error: 'Password field cannot be empty' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/login', () => {
      it('should sign in a user', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'machoman@gmail.com',
            password: 'qwertyuiop',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/login', () => {
      it('should not sign in user with a wrong email', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'dabber@gmail.com',
            password: 'qwertyuiop',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 400, error: 'Email or password is incorrect' });
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/login', () => {
      it('should not sign in user with a wrong password', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'machoman@gmail.com',
            password: 'qwerty',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal({ status: 401, error: 'Email or password is incorrect' });
          if (err) { return done(err); }
          done();
          });
      });
    });

  });
