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
  
  /**
    *@description Get office by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getOfficeById
   */

  static getOfficeById(req, res) {
    const data = offices.filter(
      OfficeObj => Number(req.params.id) === OfficeObj.id,
    );
    if (data) {
      return res.status(200).json({
        status: 200,
        data,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'id does not exist',
    });
  }
}
