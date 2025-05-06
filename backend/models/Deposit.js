import mongoose from "mongoose";
const depositSchema=new mongoose.Schema({
  accountNumber:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now,
  },
  amount:{
    type:String,
    required:true
  }
})
const Deposit=mongoose.model('Deposit',depositSchema);
export default Deposit;