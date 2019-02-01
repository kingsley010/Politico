import express from 'express';
import VoteController from '../controllers/voteController';
import AuthUser from '../middlewares/authUser';
import ValidateUser from '../middlewares/validateUser';

const router = express.Router();

router.post('/votes', AuthUser.verifyUser, VoteController.voteCandidate);

export default router;
