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

  /**
   * @description Admin - Create a new political party
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing data object
   * @memberof createParty
   */
  static createParty(req, res) {
    const {
      name, hqAddress, logoUrl,
    } = req.body;
    const id = parties[parties.length - 1].id + 1;
    const registerdAt = new Date();
    const newParty = {
      id,
      name,
      hqAddress,
      logoUrl,
      registerdAt,
    };
    if (newParty) {
      parties.push(newParty);
      return res.status(201).json({
        status: 201,
        data: [
          newParty,
        ],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'An error occured, please try again',
    });
  } 

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
  };

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
