import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { BalanceContext } from "../context/BalanceContext";
import { UserContext } from "../context/UserContext";

const Checkbalance = () => {
  const { balance, fetchBalance } = useContext(BalanceContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user && user.accountNumber) {
      fetchBalance(user.accountNumber);  
    }
  }, [user, fetchBalance]);
  const exampleTransactions = [
    {
      id: 1,
      description: "Grocery Store",
      date: "2025-04-16T14:30:00Z",
      amount: 300,
      type: "debit",
      category: "Shopping"
    }
  ];
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed min-h-screen w-[1200px] overflow-x-hidden p-6 md:p-8 mt-5">
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl border border-white/10 overflow-hidden max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Welcome back 👋
              </h1>
              <p className="text-gray-300 mt-1">Here's your account overview</p>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Balance Card */}
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-4 shadow-lg w-full md:w-2/3">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-purple-100 font-medium">Available Balance</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                      ₹{balance ? balance.toLocaleString() : "0"}
                    </h2>
                    <p className="text-purple-100 text-sm mt-2">
                      {user?.accountType || "Savings"}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs text-white">
                    Active
                  </div>
                </div>

                {/* Deposit / Withdraw */}
                <div className="mt-4 flex gap-4">
                  <Link
                    to="/dashboard/deposit"
                    className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 text-white transition-all duration-300"
                  >
                    <FiArrowDownLeft className="text-lg" />
                    <span>Deposit</span>
                  </Link>
                  <Link
                    to="/dashboard/withdraw"
                    className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 text-white transition-all duration-300"
                  >
                    <FiArrowUpRight className="text-lg" />
                    <span>Withdraw</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Account Holder</p>
                  <p className="text-white font-medium">{user?.name || "No name available"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Number</p>
                  <p className="text-white font-medium">{user?.accountNumber || "No account number available"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
            </div>
            <div className="space-y-4">
              {exampleTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-medium ${transaction.type === "debit" ? "text-red-400" : "text-green-400"}`}>
                    {transaction.type === "debit" ? (
                      <FiArrowDownLeft className="text-lg" />
                    ) : (
                      <FiArrowUpRight className="text-lg" />
                    )}
                    ₹{transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkbalance;
