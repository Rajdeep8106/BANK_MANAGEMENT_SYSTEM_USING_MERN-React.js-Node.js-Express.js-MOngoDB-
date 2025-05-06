import express from "express";
import { createWithdrawal } from "../controllers/withdrawalController.js";

const router = express.Router();

// Create a new withdrawal
router.post("/withdrawal", createWithdrawal);

export default router;
