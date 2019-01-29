import express from 'express';
import PartyController from '../controllers/partyController';
import Validate from '../middlewares/validator';

const router = express.Router();

router.patch('/parties/:id/name', Validate.findPartyById, Validate.validatePartyName, PartyController.updatePartyName);

export default router;
