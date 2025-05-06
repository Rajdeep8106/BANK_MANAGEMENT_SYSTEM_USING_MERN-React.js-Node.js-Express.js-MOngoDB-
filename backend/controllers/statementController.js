import Transaction from '../models/Transaction.js';
export const getStatement = async (req, res) => {
  const { fromDate, toDate } = req.query;
  if (!fromDate || !toDate) {
    return res.status(400).json({ message: 'Both fromDate and toDate are required.' });
  }
  try {
    const transactions = await Transaction.find({
      date: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      }
    }).sort({ date: -1 });
    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Error fetching statement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
