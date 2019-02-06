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
              firstname: 'Man',
              lastname: 'Mani',
              othername: 'Mary',
              email: 'mmm@gmail.com',
              phonenumber: '+2341293948040',
              passporturl: 'mac.jpg',
              password: 'qwerty',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              token = res.body.data[0].token;
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate', (done) => {
          request(app)
            .post('/api/v1/office/1/register')
            .set('x-auth', token)
            .send({
              office: 1,
              party: 1,
              userid: 2
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
            done();
            });
        });
      }); 

      describe ('POST /api/v1/votes', () => {
        it('should vote candidate', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('x-auth', token)
            .send({
              office: 1,
              candidate: 1,
              voter: 1
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
            done();
            });
        });
      }); 

      describe ('POST /api/v1/votes', () => {
        it('should check if user has voted before', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('x-auth', token)
            .send({
              office: 1,
              candidate: 1,
              voter: 1
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.equal({ 
                    status: 400, 
                    error: 'You have voted before. You cannot vote more than once for the same office' 
                });
            done();
            });
        });
      }); 
});