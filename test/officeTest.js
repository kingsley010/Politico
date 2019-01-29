import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import offices from '../src/models/officeModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('getAllOffice', () => {
  it('should get all offices successfully', (done) => {
    chai
      .request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.deep.equal(offices);
        done(err);
      });
  });
});
