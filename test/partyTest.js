import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import parties from '../src/models/partyModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('getPartyById', () => {
    it('should find party by id successfully', (done) => {
        chai
          .request(app)
          .get('/api/v1/parties/4')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.deep.equal([parties[4 - 1]]);
            done(err);
          });
      });
    it('should return a 400 error for invalid party id', (done) => {
        chai
          .request(app)
          .get('/api/v1/parties/hi')
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.deep.equal({
              status: 400,
              error: 'please input a number to check for party',
            });
            done(err);
          });
      });
    it('should return a 404 error when party does not exist', (done) => {
        chai
          .request(app)
          .get('/api/v1/party/5')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.deep.equal({
                'error': {
                        'message': 'Not Found'
                      }              
              });
            done(err);
          });
      });
    });
  