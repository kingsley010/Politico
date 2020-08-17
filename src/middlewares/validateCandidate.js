import client from '../config/dbConnect';

/**
 * @class ValidateCandidate
 * @description Validates candidate
 * @exports ValidateCandidate
 */
class ValidateCandidate {
    /**
       * @method isParamsInteger
       * @description Validates integer input
       * @param {object} req - The Request Object
       * @param {object} res - The Response Object
       * @returns {object} JSON API Response
       */
    static isParamsInteger(req, res, next) {
        const params = req.params.id;
        const errors = {};
        if (isNaN(params)) {
            errors.params = 'Parameter must be an Integer';
          }
        if (errors.params) {
          return res.status(400).send({
            status: 400,
            error: errors,
          });
        }
      next();
    }  
    
     /**
       * @method isCandidateInputValid
       * @description Validates candidate input
       * @param {object} req - The Request Object
       * @param {object} res - The Response Object
       * @returns {object} JSON API Response
       */
    static isCandidateInputValid(req, res, next) {
        const { office, party, candidate } = req.body;
        const errors = {};
        if (isNaN(office)) {
            errors.office = 'Office input is not valid';
        }
        if (isNaN(party)) {
            errors.party = 'Party input is not valid';
        }
        if (errors.office || errors.party) {
            return res.status(400).send({
              status: 400,
              error: errors,
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

  /**
   * @method validateExistingCandidate
   * @description Validates candidates
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static existingCandidate(req, res, next) {
    const candidate = {
      text: 'SELECT * FROM candidates WHERE userid = $1;',
      values: [req.body.userid],
    };
    return client.query(candidate, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Candidate with this id has already applied for an office',
        });
      }
      return next();
    });
  }
}

export default ValidateCandidate;
