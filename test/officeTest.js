import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import offices from '../src/models/officeModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('getOfficeById', () => {
  it('should get a specific political office successfully', (done) => {
    chai
      .request(app)
      .get('/api/v1/offices/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.deep.equal([offices[2 - 1]]);
        done(err);
      });
  });
  it('should return a 404 for office name not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/offices/9')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Office does not exist',
        });
        done(err);
      });
  });
});
