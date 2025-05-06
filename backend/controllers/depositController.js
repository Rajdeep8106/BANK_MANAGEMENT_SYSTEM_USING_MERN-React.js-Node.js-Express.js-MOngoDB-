import Deposit from "../models/Deposit.js";
import Transaction from "../models/Transaction.js";
export const createDeposit = async (req, res) => {
  try {
    const { accountNumber, date, amount } = req.body;
    if (!accountNumber || !date || !amount) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newDeposit = new Deposit({ accountNumber, date, amount });
    await newDeposit.save();
    const referenceNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const newTransaction = new Transaction({
      accountNumber,
      amount: Number(amount),
      date,
      type: 'Deposit',
      referenceNumber,
    });
    await newTransaction.save();
    res.status(201).json({
      message: 'Deposit successful and transaction recorded',
      deposit: newDeposit,
      transaction: newTransaction
    });
  } catch (error) {
    console.error('Deposit Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
