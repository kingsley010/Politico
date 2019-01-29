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
}
