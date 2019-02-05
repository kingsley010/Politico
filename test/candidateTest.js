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
              firstname: 'Jessica',
              lastname: 'Chizoba',
              othername: 'Zizi',
              email: 'Jessy@gmail.com',
              phonenumber: '+234-12345678',
              passporturl: 'meg.jpg',
              password: 'meggy',
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

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate', (done) => {
          request(app)
            .post('/api/v1/office/1/register')
            .set('x-auth', token)
            .send({
              office: 1,
              party: 1,
              userid: 1
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should check if office id exists', (done) => {
          request(app)
            .post('/api/v1/office/40/register')
            .set('x-auth', token)
            .send({
              office: 1,
              party: 1,
              userid: 1
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.equal({ status: 400, error: 'Office id does not exist' });
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should check if candidate has already applied for an office', (done) => {
          request(app)
            .post('/api/v1/office/1/register')
            .set('x-auth', token)
            .send({
              office: 1,
              party: 1,
              userid: 1
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.equal({ status: 409, error: 'Candidate with this id has already applied for an office' });
            if (err) { return done(err); }
            done();
            });
        });
      });
}); 
