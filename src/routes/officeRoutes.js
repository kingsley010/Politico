import express from 'express';
import OfficeController from '../controllers/officeController';
import Validate from '../middlewares/validator';

const router = express.Router();

<<<<<<< HEAD
router.post('/offices', Validate.officeType, Validate.officeName, OfficeController.createOffice);
=======
router.get('/offices', OfficeController.getAllOffice);
>>>>>>> ft-get-all-political-offices-163318692

export default router;
