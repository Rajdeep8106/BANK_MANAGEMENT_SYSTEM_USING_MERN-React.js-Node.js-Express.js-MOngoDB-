import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { BalanceContext } from "../context/BalanceContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(""); 
  const [error, setError] = useState("");
  const { balance, fetchBalance, updateBalance } = useContext(BalanceContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];  
    setDate(today);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (amountNum > balance) {
      setError("Insufficient balance");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/withdrawal", {
        amount: amountNum,
        date,
        accountNumber: user?.accountNumber,
      });
      const newBalance = balance - amountNum; 
      updateBalance(newBalance); 
      const newTransaction = {
        id: new Date().getTime(),
        accountNumber: user?.accountNumber,
        type: "Withdrawal",
        amount: amountNum,
        date: date,
        status: "Completed", 
      };
      const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      setTimeout(async () => {
        await fetchBalance();
        Swal.fire({
          title: "Success!",
          text: `₹${amountNum} successfully withdrawn`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/checkbalance");
        });
      }, 300);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="fixed bg-white p-8 rounded-lg shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Withdrawal Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Account Number</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={user?.accountNumber || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Available Balance</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              value={`₹${balance}`}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md">Withdraw</button>
        </form>
      </div>
    </div>
  );
};
export default Withdrawal;
