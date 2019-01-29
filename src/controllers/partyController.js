import parties from '../models/partyModel';

/**
 * Class representing PartyController
 * @class PartyController
 */
export default class PartyController {
  /**
   * @description Update a specific political party
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof updateName
   */

  static updatePartyName(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;
    const partyUpdate = parties.find(partyObj => partyObj.id === id);
    if (req.body.name === undefined) {
      return res.status(404).json({
        status: 404,
        error: 'Party name must be specified',
      });
    }
    const partyIndexOf = parties.indexOf(partyUpdate);
    partyUpdate.name = name;
    parties[partyIndexOf] = partyUpdate;
    return res.status(200).json({
      status: 200,
      data: [{ id, name }],
    });
  }
}