import express from 'express';
import VoteController from '../controllers/voteController';
import AuthUser from '../middlewares/authUser';
import ValidateUser from '../middlewares/validateUser';
import ValidateVote from '../middlewares/validateVotes';

const router = express.Router();

router.post('/votes', AuthUser.verifyUser, ValidateVote.votedAlready, VoteController.voteCandidate);

export default router;
