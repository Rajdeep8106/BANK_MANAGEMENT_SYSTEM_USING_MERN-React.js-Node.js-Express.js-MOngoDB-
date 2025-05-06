import express from 'express';
import { getStatement } from '../controllers/statementController.js';

const router = express.Router();
router.get('/', getStatement);

export default router;
