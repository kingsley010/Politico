import client from '../config/herokuConnect';

/**
 * @class resultController
 * @description result controller
 *
 */

class ResultController {
  /**
    * @description candidate result
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing data object
    * @memberof voteCandidate
    */
  static getResult(req, res) {
    const { id } = req.params;
    client.query('SELECT office, candidate, count(candidate) as results FROM votes where office = $1 GROUP BY candidate, office', [id], (err, dbRes) => {
      if (err) {
       return res.status(400).send({
         message: 'No result for this office found'
       });
     }
     return res.status(200).send({
       data: [{
         status: 200,
         result: dbRes.rows[0].results,
       }],
     });
   });
  }
}
     
export default ResultController;
