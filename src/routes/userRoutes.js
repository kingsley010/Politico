import express from 'express';
import UserController from '../controllers/userController';
import ValidateUser from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', ValidateUser.signUpDetails, ValidateUser.userExists, UserController.signUp);

router.post('/auth/login', ValidateUser.loginDetails, UserController.logIn);

export default router;
