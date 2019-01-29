import express from 'express';
import PartyController from '../controllers/partyController';
import Validate from '../middlewares/Validator';

const router = express.Router();

router.post('/parties',  Validate.validatePartyName, Validate.validateHqAddress, Validate.validateLogoUrl, PartyController.createParty);

export default router;
