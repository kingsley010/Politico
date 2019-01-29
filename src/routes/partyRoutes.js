import express from 'express';
import PartyController from '../controllers/partyController';
import Validate from '../middlewares/validator';

const router = express.Router();

router.delete('/parties/:id', Validate.findPartyById, PartyController.deletePartyById);

export default router;
