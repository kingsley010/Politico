import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import offices from '../src/models/officeModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('createOffice', () => {
  it('should create office successfully', (done) => {
    const newOffice = {
      type: 'federal',
      name: 'senate',
    };
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data[0].name).to.be.equal(newOffice.name);
        expect(res.body.data[0].type).to.be.equal(newOffice.type);
        done(err);
      });
  });
  it('should have status 500 for invalid name', (done) => {
    const newOffice = {
      type: 'federal',
      name: 1,
    };
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done(err);
      });
  });
  it('should throw an error for empty name field', (done) => {
    const newOffice = {
      type: 'federal',
      name: '',
    };
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('should have a 404 status error for empty type', (done) => {
    const newOffice = {
      type: '',
      name: 'presidency',
    };
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('should have a 404 status error for creating invalid office type', (done) => {
    const newOffice = {
      type: 'football',
      name: 'Peter Obi',
    };
    chai
      .request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
});
  
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
