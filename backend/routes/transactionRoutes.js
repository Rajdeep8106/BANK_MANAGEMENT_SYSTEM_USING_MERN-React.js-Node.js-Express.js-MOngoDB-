// transactionRoutes.js
import express from 'express';
import { getTransactionHistory } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/transactions', getTransactionHistory); // Ensure this endpoint is correct

export default router;
