import pg from 'pg';
import 'babel-polyfill';
import client from '../config/dbConnect';

/**
 * @class CandidateController
 * @description candidate controller
 *
 */

class CandidateController {
/**
  * @description registers a new political candidate
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON representing data object
  * @memberof createCandidate
  */
  static registerCandidate(req, res) {
    const {
      office, party, candidate,
    } = req.body;
    client.query('INSERT INTO candidates(office, party, candidate) VALUES($1,$2,$3) RETURNING *',
    [office, party, candidate], (err, result) => {
     if (err) {
       return res.status(400).send({
         message: err,
       });
     }
     return res.status(201).send({
       data: [{
         status: 201,
         data: result.rows[0].id,
       }],
     });
   });
  }
}
     
export default CandidateController;
