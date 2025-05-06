import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 5;

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      const sorted = res.data.transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sorted);
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('Unable to fetch transaction history.');
    }
  };
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = transactions.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  return (
    <div className="fixed max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Account #</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Reference #</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length ? (
              currentItems.map((txn) => (
                <tr key={txn._id} className="hover:bg-gray-100 transition-all">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{txn.accountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{txn.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">₹ {txn.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(txn.date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{txn.referenceNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default TransactionHistory;
