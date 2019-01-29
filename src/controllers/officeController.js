import offices from '../models/officeModel';

/**
 * Class representing OfficeController
 * @class OfficeController
 */
export default class OfficeController {
  /**

   * @description Get all offices
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllOffice
   */

  static getAllOffice(req, res) {
    return res.status(200).json({
      status: 200,
      data: offices,
    });
  }
}
