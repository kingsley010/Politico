import express from 'express';
import OfficeController from '../controllers/officeController';
import Validate from '../middlewares/validator';

const router = express.Router();

router.post('/offices', Validate.officeType, Validate.officeName, OfficeController.createOffice);
router.get('/offices', OfficeController.getAllOffice);

export default router;
