import express from 'express';
import CandidateController from '../controllers/candidateController';
import AuthUser from '../middlewares/authUser';

const router = express.Router();

router.post('/offices/:id/register', AuthUser.verifyUser, CandidateController.registerCandidate);

export default router;
