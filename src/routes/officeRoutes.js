import express from 'express';
import OfficeController from '../controllers/officeController';
import Validate from '../middlewares/validator';
import AuthUser from '../middlewares/authUser';

const router = express.Router();

router.post('/offices', AuthUser.verifyAdmin, Validate.officeType, Validate.officeName, OfficeController.createOffice);
router.get('/offices', OfficeController.getAllOffice);
router.get('/offices/:id', Validate.findOfficeById, OfficeController.getOfficeById);

export default router;
