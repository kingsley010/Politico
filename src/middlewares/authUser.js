import jwt from 'jsonwebtoken';
import Helper from '../helpers/helper';

/**
 * @class AuthUser
 * @description Authentication
 * @exports AuthUser
 */
export default class AuthUser {
  /**
   * @method verifyUser
   * @description Verifies user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static verifyUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];
    if (token) {
      jwt.verify(token, process.env.DB_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send(err);
        } else {
          req.decoded = decoded;
        }
      });
    } else {
      return res.status(400).send({
        status: res.sendStatus,
        message: 'No token provided'
      });
    }
    return next();
  }

  /**
   * @method verifyAdmin
   * @description verifies admin 
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static verifyAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];
    if (token) {
      jwt.verify(token, process.env.DB_SECRET, (err, decoded) => {   
        if (err) {
            return res.status(401).send(err);
        }
        if (decoded.isadmin === 'false') {
            return req.isadmin = decoded.isadmin;
        }
        else {
            return res.status(401).send({
            status: res.statusCode,
            error: 'Only an admin can access this resource',
          });
        }
      });
    } else {
            const err = { status: 403, message: 'Admin verification failed' };
             return res.status(403).send(err);
    }
    next();
  }
}
