import pg from 'pg';
import Helper from '../helpers/helper';
import client from '../config/dbConnect';


/**
 * @class UserController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports UserController
 */

class UserController {
  /**
  * @method signUp
  * @description sign up user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static signUp(req, res) {
    const {
      firstname, lastname, othername,
      email, phonenumber, password, passporturl,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);

    try {
      const query = `INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passporturl) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [firstname, lastname,
        othername, email, phonenumber,
        hashedPassword, passporturl];
      client.query(query, values, (err, db) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'Database connection error',
          });
        }
        const user = db.rows[0];
        const { id, isadmin } = user;
        const token = Helper.generateToken({ isadmin, id, email });
        return res.header('x-auth', token).status(201).json({
          status: 201,
          data: [{ 
              token, 
              user
             }],
        });
      });
    } catch (err) {
        return res.status(400).send(err);
    }
  }


  /**
   * @method logIn
   * @description Log in user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static logIn(req, res) {
    const { email, password } = req.body;
    const errors = { form: 'Invalid email or password' };
    const userQuery = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
    const params = [email];
    client.query(userQuery, params)
      .then((dbRes) => {
        if (dbRes.rows[0]) {
          const getPassword = Helper.hashPassword(password, dbRes.rows[0].password);
          if (getPassword) {
            const user = dbRes.rows[0];
            const token = Helper.generateToken(req.body);
            return res.status(200).json({
              status: 200,
              data: [{
                token,
                message: 'Logged in successfully',
              }],
            });
          }
          return res.status(401).json({
            status: 401,
            error: errors,
          });
        }
        return errors;
      }).catch(error => error(res, 500, errors));
  }
}

export default UserController;
