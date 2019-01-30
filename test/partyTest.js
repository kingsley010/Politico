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
describe('createParty', () => {
    it('should have a status 201', (done) => {
      const newParty = {
        name: 'coalition',
        hqAddress: 'Abuja',
        logoUrl: 'coa.jpg'
      };
      chai
        .request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data[0].name).to.be.equal(newParty.name);
          expect(res.body.data[0].hqAddress).to.be.equal(newParty.hqAddress);
          expect(res.body.data[0].logoUrl).to.be.equal(newParty.logoUrl);
          done(err);
        });
    });
    it('should have a status 500 for invalid name', (done) => {
      const newParty = {
        name: 7,
        hqAddress: 'Abuja',
        logoUrl: '007.png',
      };
      chai
        .request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done(err);
        });
    });
    it('should have an error status of 400 for empty name field', (done) => {
      const newParty = {
        name: '',
        hqAddress: 'Abuja',
        logoUrl: 'man.jpg',
      };
      chai
        .request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.deep.equal({
            status: 404,
            error: 'Please input party name',
          });
          done(err);
        });
    });
    it('should have an error status 400 for empty hqAddress', (done) => {
      const party = {
        name: 'BOND',
        hqAddress: '',
        logoUrl: 'man.jpg',
      };
      chai
        .request(app)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.deep.equal({
            status: 400,
            error: 'Address is required',
          });
          done(err);
        });
    });
    it('should have an error status 400 for empty logoUrl', (done) => {
      const newParty = {
        name: 'CAP',
        hqAddress: 'Abuja',
        logoUrl: '',
      };
      chai
        .request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.deep.equal({
            status: 400,
            error: 'Please input a logo for your party',
          });
          done(err);
        });
    });
  });
});
  