import Helper from '../helpers/helper';
import parties from '../models/partyModel';
import offices from '../models/officeModel';

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

  /**
    * @method validatePartyName
    * @description validates party name
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validatePartyName(req, res, next) {
    const validate = Helper.validate();
    let error = '';
    const { name } = req.body;
    if (!validate.name.test(name)) {
      error = 'party name is invalid';
    }
    if (!name || !name.trim()) {
      error = 'Please input party name';
    }
    const duplicateNames = parties.find(party => party.name === name);
    if (duplicateNames) {
      error = 'Party name already exists, please choose another name';
    }
    if (error) {
      return res.status(404).json({
        status: 404, 
        error,
      });
    }

    return next();
  }

  /**
    * @method validateHqAddress
    * @description valiates hqAddress
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateHqAddress(req, res, next) {
    const validate = Helper.validate();
    let error = '';
    const { hqAddress } = req.body;
    if (!validate.hqAddress.test(hqAddress)) {
      error = 'hqAddress is invalid';
    } if(Number(hqAddress)) {
        error = 'Please input a valid address';
    } else if (!hqAddress || !hqAddress.trim()) {
      error = 'Address is required';
    }
    if (error) {
      return res.status(400).json({
           status: 400, 
           error 
        });
    }
    return next();
  }

  /**
    * @method findOfficeById
    * @description Validates Office by id 
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
    static findOfficeById(req, res, next) {
        const { id } = req.params;
        if (!Number(id)) {
            return res.status(400).json({
            status: 400,
            error: 'Please input a valid id',
            });
        }
        const officeFound = offices.find(office => office.id === Number(id));
        if (!officeFound) {
            return res.status(404).json({
            status: 404,
            error: 'Office does not exist',
            });
        }
        return next();
        }

  /**
    * @method validateLogoUrl
    * @description validates logourl
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {function} next - Calls the next function
    * @returns {object} JSON representing the failure message
    * @memberof findOfficeById
    */
  static validateLogoUrl(req, res, next) {
    const validate = Helper.validate();
    let error = '';
    const { logoUrl } = req.body;
    if (!validate.logoUrl.test(logoUrl)) {
      error = 'party logo is invalid';
    }
    if (!logoUrl || !logoUrl.trim()) {
      error = 'Please input a logo for your party';
    }
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  }

/**
  * @method officeType
  * @description Validates Office type 
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static officeType(req, res, next) {
    const validate = Helper.validate();
    let error = '';
    const { type } = req.body;
    if (!validate.type.test(type)) {
      error = 'Invalid office type';
    }
    if (Number(type)) {
    error = 'Please input a valid type';
    }
    if (!type.trim()) {
      error = 'This field is required';
    }
    if (error) {
      return res.status(404).json({
        status: 404, 
        error,
      });
    }
    return next();
  }    

  /**
    * @method officeName
    * @description Validates office name
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
     static officeName(req, res, next) {
        const validate = Helper.validate();
        let error = '';
        const { name } = req.body;
        if (!validate.name.test(name)) {
          error = 'Office name is invalid';
        }
        if (Number(name)) {
        error = 'Please input a valid name';
        }
        if (!name.trim()) {
          error = 'This field is required';
        }
        const duplicateOffice = offices.find(office => office.name === name);
        if (duplicateOffice) {
          error = 'This name already exists';
        }
        if (error) {
          return res.status(404).json({
            status: 404, 
            error,
          });
        }
        return next();
    }    
}
