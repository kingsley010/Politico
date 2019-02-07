import client from '../config/herokuConnect';

/**
 * @class ValidateResult
 * @description Validates result
 * @exports Validateresult
 */
export default class ValidateResult {
 /**
   * @method validate result
   * @description Validates result
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static isParamsInteger(req, res, next) {  
    const params = Number(req.params.id);
    if (isNaN(params)) {
        return res.status(400).send({
          status: 400,
          error: 'Parameter must be an Integer'
        });
      }
  next();
 }

 /**
   * @method doesOfficeIdExist
   * @description Validates candidate userId
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
    static doesOfficeIdExist(req, res, next) {
      const { id } = req.params;
      const query = `SELECT id FROM office WHERE id = $1`; 
      client.query(query, [id], (err, dbRes) => {
          if (!dbRes.rows[0]) {
              return res.status(400).send({
              status: 400,
              error: 'Office id does not exist'
              });
          } 
          return next();
      });
}
}
