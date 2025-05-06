import React, { useState } from 'react';
import axios from 'axios';
const Statement = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const fetchStatement = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/statement', {
        params: { fromDate, toDate }
      });
      setTransactions(res.data.transactions);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not fetch transactions.');
    }
  };
  return (
    <div className="fixed max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20 ml-50">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Bank Statement</h2>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label className="text-sm text-gray-700">From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={fetchStatement}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Statement
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Account #</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Ref #</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{txn.accountNumber}</td>
                  <td className="px-4 py-2">{txn.type}</td>
                  <td className="px-4 py-2 text-green-700 font-semibold">₹{txn.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        txn.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{txn.referenceNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statement;
