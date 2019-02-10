import client from '../config/herokuConnect';

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
      office, party, userid,
    } = req.body;
    client.query('INSERT INTO candidates(office, party, userid) VALUES($1,$2,$3) RETURNING *',
    [office, party, userid], (err, result) => {
     if (err) {
       return res.status(400).send({
         message: err,
       });
     }
     return res.status(201).send({
       data: [{
         status: 201,
         data: result.rows[0],
       }],
     });
   });
  }
}
     
export default CandidateController;
