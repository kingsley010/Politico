import express from 'express';
import CandidateController from '../controllers/candidateController';
import ValidateCandidate from '../middlewares/validateCandidate';
import AuthUser from '../middlewares/authUser';

const router = express.Router();

router.post('/office/:id/register', AuthUser.verifyAdmin, ValidateCandidate.isParamsInteger, 
ValidateCandidate.isCandidateInputValid, ValidateCandidate.doesOfficeIdExist, 
ValidateCandidate.existingCandidate, CandidateController.registerCandidate);

export default router;
