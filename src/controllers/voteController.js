import 'babel-polyfill';
import client from '../config/dbConnect';

/**
 * @class vote controller
 * @description Handles votes
 *
 */
class VoteController {
  /**
         * @description Vote
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createVote
         */
  static async createVote(req, res) {
    const { office, candidate } = req.body;
    const { id: voter } = req.user;
    const query = `
    INSERT INTO vote(office, candidate, voter) VALUES($1, $2, $3) RETURNING *`;
    const params = [office, candidate, voter];
    try {
      const { rows } = await client.query(query, params);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with the database',
      });
    }
  }
}

export default VoteController;
