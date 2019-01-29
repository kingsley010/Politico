import parties from '../models/partyModel';

/**
 * Class representing PartyController
 * @class PartyController
 */
export default class PartyController {
   /**
   * @description Deletes party by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof deletePartyById
   */

  static deletePartyById(req, res) {
    const id = Number(req.params.id);
    const deleteParty = parties.find(party => party.id === id);
    const objId = parties.indexOf(deleteParty);
    parties.splice(objId, 1);
    if (objId) {
      return res.status(200).json({
        status: 200,
        data: [{
          id,
          message: 'Party deleted successfully',
        }],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Party does not exist',
    });
  }
}