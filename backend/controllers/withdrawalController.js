import Withdrawal from "../models/Withdrawal.js"; // Withdrawal model
import Transaction from "../models/Transaction.js";
export const createWithdrawal = async (req, res) => {
  const { amount, date, accountNumber } = req.body;
  if (!amount || !date || !accountNumber) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }
  try {
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }
    const withdrawal = new Withdrawal({
      amount,
      date,
      accountNumber,
    });
    await withdrawal.save();
     const referenceNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const newTransaction = new Transaction({
          accountNumber,
          amount: Number(amount),
          date,
          type: 'Withdrawal',
          referenceNumber,
        });
    await newTransaction.save();
    res.status(200).json({
      message: `₹${amount} successfully withdrawn`, 
      newBalance: "Balance will be handled outside of this API", 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};
