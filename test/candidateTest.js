import supertest from 'supertest';
import 'babel-polyfill';
import chai from 'chai';
import app from '../app';
import candidateInput from './seed/candidate.data';

const user2Token = { token: null };
const { should, expect } = chai;
should();
const request = supertest(app);

describe('Candidate test', () => {
  describe('Test case for creating a candidate', () => {
    it('should return 500 error for internal server error', (done) => {
      request.post('/api/v1/offices/1/register')
        .send(candidateInput.candidateData1)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          done(err);
        });
    });
  });
});
