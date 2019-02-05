/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

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
              firstname: 'Manchi',
              lastname: 'Perfect',
              othername: 'Macho',
              email: 'mack@gmail.com',
              phonenumber: '+23412939440',
              passporturl: 'mac.jpg',
              password: 'qwerty',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              token = res.body.data[0].token;
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('GET /api/v1/office/w/result', () => {
        it('should return invalid office url id', (done) => {
          request(app)
            .get('/api/v1/office/w/result')
            .set('x-auth', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.deep.equal({ 
                    status: 400,
                    error: 'Parameter must be an Integer' 
                });
            if (err) { return done(err); }
            done();
            });
        });
      }); 

      describe ('GET /api/v1/office/:id/result', () => {
        it('should return error for office if not found', (done) => {
          request(app)
            .get('/api/v1/office/2/result')
            .set('x-auth', token)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.equal({ 
                    status: 400, 
                    error: 'Office id does not exist' 
                });
            if (err) { return done(err); }
            done();
            });
        });
      }); 
});