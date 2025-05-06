import Transaction from '../models/Transaction.js';
export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Transaction Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
