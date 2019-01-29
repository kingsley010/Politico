import express from 'express';
import PartyController from '../controllers/partyController';
import Validate from '../middlewares/validator';

const router = express.Router();

router.get('/parties', PartyController.getAllParties);

export default router;
