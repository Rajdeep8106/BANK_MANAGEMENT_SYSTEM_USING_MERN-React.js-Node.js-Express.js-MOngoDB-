import express from "express";
import { createDeposit } from "../controllers/depositController.js";

const router = express.Router();

router.post("/deposit", createDeposit);  // POST route for deposit

export default router;
