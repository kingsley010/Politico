import express from 'express';
import ResultController from '../controllers/resultController';
import AuthUser from '../middlewares/authUser';
import ValidateUser from '../middlewares/validateUser';
import ValidateResult from '../middlewares/validateResult';

const router = express.Router();

router.get('/office/:id/result', AuthUser.verifyUser, ValidateResult.isParamsInteger, ValidateResult.doesOfficeIdExist, ResultController.getResult);

export default router;
