import Helper from '../helpers/helper';
import client from '../config/dbConnect';

/**
 * @class ValidateUser
 * @description Validates user
 * @exports ValidateUser
 */
export default class ValidateUser {
  /**
   * @method signUpDetails
   * @description Validates user sign in details
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static signUpDetails(req, res, next) {
    const validate = Helper.validate();
    const {
      firstname, lastname, phonenumber, email, password, passporturl,
    } = req.body;
    let error;
    if (!validate.name.test(firstname)) {
      error = 'invalid firstname';
    }
    if (!firstname || !firstname.trim()) {
      error = 'Firstname field is required';
    }
    if (!validate.name.test(lastname)) {
      error = 'invalid last name';
    }
    if (!lastname || !lastname.trim()) {
      error = 'Lastname field is required';
    }
    if (!email || !validate.email.test(email)) {
        error = 'email is invalid, please use a valid email';
    }
    if (!email || !email.trim()) {
        error = 'Email field is required';
    }
    if (!validate.phonenumber.test(phonenumber)) {
      error = 'phone number is invalid';
    }
    if (!phonenumber || !phonenumber.trim()) {
      error = 'phonenumber field is required';
    }
    if (!passporturl || !validate.logoUrl.test(passporturl)) {
      error = 'Please include a valid passport';
    }
    if (!password.trim()) {
      error = 'Password field cannot be empty';
    }
    if (!validate.hqAddress.test(password)) {
      error = 'Password is invalid';
    }
    if (error) {
      return res.status(400).json({ status: 400, error });
    }
    if (password.length < 5) {
      error = 'Password should not be less than 6 characters';
      return res.status(400).json({ status: 400, error });
    }

    return next();
  }

  /**
   * @method loginDetails
   * @description Validates login details 
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static loginDetails(req, res, next) {
    const validate = Helper.validate();
    const { email, password } = req.body;
    const path = req.url.trim().split('/')[2];
    let error;
    let status;

    const query = 'SELECT id, email, password, isadmin FROM users WHERE email = $1';

    if (!validate.email.test(email)) {
      error = 'The email you provided is invalid';
    } if (!password) {
      error = 'Please provide a password';
    } if (error) {
      status = 404;
      return res.status(status).json({ status, error });
    }

    if (path === 'login') {
      return client.query(query, [email], (err, dbRes) => {
        if (dbRes.rowCount < 1) {
          return res.status(400).json({
            status: 400,
            error: 'Email or password is incorrect',
          });
        }

        const hashedPassword = dbRes.rows[0].password;
        const verifyPassword = Helper.verifyPassword(`${password}`, hashedPassword);
        if (!verifyPassword) {
          error = 'Email or password is incorrect';
          status = 401;
        }
        if (error) {
          return res.status(status).json({ status, error });
        }

        const userReq = dbRes.rows[0];
        req.user = { id: userReq.id, email: userReq.email, isadmin: userReq.isadmin };
        return next();
      });
    }

    return next();
  }

  /**
   * @method userExists
   * @description Validates existing user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static userExists(req, res, next) {
    const userEmail = {
      text: 'SELECT * FROM users WHERE email = $1;',
      values: [req.body.email],
    };
    return client.query(userEmail, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'email aleady exists, please choose another email',
        });
      }
      return next();
    });
  }
}
