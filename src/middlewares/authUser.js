import Helper from '../helpers/helper';

/**
 * @class AuthUser
 * @description Authentication
 * @exports AuthUser
 */
export default class AuthUser {
  /**
   * @method authHeader
   * @description Verifies authorization header
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static authHeader(req) {
    if (!req.headers.authorization || !req.headers['x-access-token'] || !req.body.token || req.query.token) {
      return { error: 'error' };
    }
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);
    if (!payload) {
      return { error: 'token' };
    }
    return payload;
  }

  /**
   * @method verifyUser
   * @description Verifies user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static verifyUser(req, res, next) {
    const payload = AuthUser.authHeader(req);
    let error;
    let status;
    if (!payload && payload.error === 'auth') {
      status = 401;
      error = 'Access is required';
    }
    if (payload && payload.error === 'token') {
      status = 401;
      error = 'token cannot be authenticated.';
    }
    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
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
    const payload = AuthUser.authHeader(req);
    const { id } = payload;
    if (id === 1) {
      return res.status(401).json({
        status: 401,
        error: 'Only a verified admin can access this endpoint',
      });
    }
    return next();
  }
}
