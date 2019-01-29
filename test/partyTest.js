import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import parties from '../src/models/partyModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('editPartyName', () => {
    it('should edit party successfully', (done) => {
      const editName = { 
          name: 'Coalition' };
      chai
        .request(app)
        .patch('/api/v1/parties/1/name')
        .send(editName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            data: res.body.data,
          });
          done(err);
        });
    });
  });
