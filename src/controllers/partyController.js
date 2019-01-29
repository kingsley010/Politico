import parties from '../models/partyModel';

/**
 * Class representing PartyController
 * @class PartyController
 */
export default class PartyController {
  /**
   * @description Get all registered Political party
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllParty
   */

  static getAllParties(req, res) {
    return res.status(200).json({
      status: 200,
      data: parties,
    });
  }
}