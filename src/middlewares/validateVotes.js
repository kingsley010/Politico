import client from '../config/dbConnect';

/**
 * @class ValidateVote
 * @description Validates votes
 * @exports ValidateVote
 */
export default class ValidateVote {
/**
   * @method votedAlready
   * @description Validates vote
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static votedAlready(req, res, next) {
    const userVote = {
      text: 'SELECT * FROM votes WHERE voter = $1 AND office = $2;',
      values: [req.body.voter, req.body.office],
    };
    return client.query(userVote, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'You have voted before. You cannot vote more than once for the same office',
        });
      }
      return next();
    });
  }
}