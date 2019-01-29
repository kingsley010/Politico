import express from 'express';
import PartyController from '../controllers/PartyController';
import Validate from '../middlewares/Validator';

const router = express.Router();

router.get('/parties', PartyController.getAllParties);

export default router;
