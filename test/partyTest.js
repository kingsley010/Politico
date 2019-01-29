import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import parties from '../src/models/partyModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('deletePartyById', () => {
    it('should delete party successfully', (done) => {
      chai
        .request(app)
        .delete('/api/v1/parties/2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data[0].message).to.equal('Party deleted successfully');
          expect(res.body).to.deep.equal({
            status: 200,
            data: res.body.data,
          });
          done(err);
        });
    });
    it('should return a 404 error if party is not found', (done) => {
        chai
        .request(app)
        .delete('/api/v1/parties/2')
        .end((err, res) => {
            expect(res).to.have.status(404);
            done(err);
          });
      });
  });
