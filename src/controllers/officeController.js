import offices from '../models/officeModel';

/**
 * Class representing OfficeController
 * @class OfficeController
 */
export default class OfficeController {
  /**
    * @description Creates a new political office
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing data object
    * @memberof createOffice
    */
  static createOffice(req, res) {
    const { type, name } = req.body;
    const id = offices[offices.length - 1].id + 1;
    const registerdAt = new Date();
    const newOffice = { id, type, name, registerdAt };
    if (newOffice) {
      offices.push(newOffice);
      return res.status(201).json({
        status: 201,
        data: [
          newOffice,
        ],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Bad request',
    });
  }
}
