import Helper from '../helpers/helper';
import offices from '../models/officeModel';

/**
 * @class Validate
 * @description validates party and office model
 * @exports Validate
 */

export default class Validate {
  /**
     * @description Gets a specific office by id
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @param {function} next - Calls the next function
     * @returns {object} JSON representing the failure message
     * @memberof findOfficeById
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
    if (!type || type === undefined) {
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
        if (!name || name === undefined) {
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
