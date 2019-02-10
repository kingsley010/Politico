import express from 'express';
import PartyController from '../controllers/partyController';
import Validate from '../middlewares/validator';
import AuthUser from '../middlewares/authUser';

const router = express.Router();

router.get('/parties', PartyController.getAllParties);
router.post('/parties', AuthUser.verifyAdmin, Validate.validatePartyName, Validate.validateHqAddress, Validate.validateLogoUrl, PartyController.createParty);
router.get('/parties/:id', Validate.findPartyById, PartyController.getPartyById);
router.patch('/parties/:id/name', AuthUser.verifyAdmin, Validate.findPartyById, Validate.validatePartyName, PartyController.updatePartyName);
router.delete('/parties/:id', AuthUser.verifyAdmin, Validate.findPartyById, PartyController.deletePartyById);

export default router;
