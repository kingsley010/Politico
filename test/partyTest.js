import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import parties from '../src/models/partyModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('getAllParties', () => {
    it('should return get all parties successfully', (done) => {
        chai
          .request(app)
          .get('/api/v1/parties')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.deep.equal(parties);
            done(err);
          });
      });
  });
  