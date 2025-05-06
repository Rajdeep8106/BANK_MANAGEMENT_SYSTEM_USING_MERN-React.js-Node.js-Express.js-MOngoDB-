import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number, 
    required: true,
  },
  type: {
    type: String, 
    enum: ['Deposit', 'Withdrawal'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: 'Success',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  referenceNumber: {
    type: String,
    required: true,
  },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
