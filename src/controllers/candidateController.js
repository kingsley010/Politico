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
         * @description Create a new political party
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createCandidate
         */
  static async registerCandidate(req, res) {
    const {
      office, party, candidate,
    } = req.body;
    const query = `
      INSERT INTO candidate(office, party, candidate) VALUES($1, $2, $3) RETURNING *`;
    const params = [office, party, candidate];
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

export default CandidateController;
