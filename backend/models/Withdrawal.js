import mongoose from "mongoose";
const withdrawalSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  accountNumber: { type: String, required: true },
});
const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
export default Withdrawal;
