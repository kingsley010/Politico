import parties from '../models/partyModel';

/**
 * @class Validate
 * @description validates party and office model
 * @exports Validate
 */

export default class Validate {
  /**
         * @description Get a specific party by id
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @param {function} next - Calls the next function
         * @returns {object} JSON representing the failure message
         * @memberof findById
         */
  static findPartyById(req, res, next) {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({
        status: 400,
        error: 'please input a number to check for party',
      });
    }
    const Party = parties.find(party => party.id === Number(id));
    if (!Party) {
      return res.status(404).json({
        status: 404,
        error: 'party does not exist',
      });
    }
    return next();
  }
}
