import parties from '../models/partyModel';

/**
 * Class representing PartyController
 * @class PartyController
 */
export default class PartyController {
  /**
   * @description Get Party By Id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getPartyById
   */
  static getPartyById(req, res) {
    const data = parties.filter(
      partyObj => Number(req.params.id) === partyObj.id,
    );
    res.status(200).json({
      status: 200,
      data,
    });
  }
}
