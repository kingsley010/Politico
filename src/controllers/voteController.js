import client from '../config/herokuConnect';

/**
 * @class VoteController
 * @description vote controller
 *
 */

class VoteController {
  /**
    * @description votes a candidate
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing data object
    * @memberof voteCandidate
    */
  static voteCandidate(req, res) {
    const {
      office, candidate, voter
    } = req.body;
    client.query('INSERT INTO votes(office, candidate, voter) VALUES($1,$2,$3) RETURNING *',
    [office, candidate, voter], (err, result) => {
     if (err) {
       console.log(err);
       return res.status(400).send({
         message: err,
       });
     }
     return res.status(201).send({
       data: [{
         status: 201,
         data: result.rows[0].candidate,
       }],
     });
   });
  }
}
     
export default VoteController;
