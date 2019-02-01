import supertest from 'supertest';
import 'babel-polyfill';
import chai from 'chai';
import app from '../app';
import candidateInput from './seed/vote.data';

const user2Token = { token: null };
const { should, expect } = chai;
should();
const request = supertest(app);

describe('Vote test', () => {
  describe('Test case for voting', () => {
    it('should return 404 error for page not found', (done) => {
      request.post('/api/v1/offices/vote')
        .send(candidateInput.candidateData1)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
});
