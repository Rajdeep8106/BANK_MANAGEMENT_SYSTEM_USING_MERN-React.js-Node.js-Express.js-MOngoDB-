import React, { useState, useEffect } from 'react';
import axios from "axios";

const Deposit = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await axios.post('http://localhost:5000/api/deposit', {
        accountNumber,
        date: currentDate,
        amount
      });
      setSuccess(true);
      setTimeout(() => {
        setAccountNumber('');
        setAmount('');
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error", err);
      setError(err.response?.data?.message || 'Deposit Failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="fixed w-full max-w-lg">
        <div className="relative">
          <div className="absolute -inset-2 bg-blue-200/30 blur-lg rounded-2xl"></div>
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-5 px-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Fund Deposit</h2>
                  <p className="text-blue-100 text-sm mt-1">Secure transaction portal</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {success && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md animate-fade-in">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-emerald-800 font-medium">Deposit successful! Your funds will be available shortly.</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-fade-in">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 flex items-center">
                  <span>Account Number</span>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Required</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter 12-digit account number"
                    required
                    pattern="\d{12}"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                     Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      value={currentDate}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 flex items-center">
                    <span>Amount</span>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Required</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-8 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="0.00"
                      required
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">USD</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                    isLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Deposit...
                    </>
                  ) : (
                    <>
                      <svg className="-ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Confirm Deposit
                    </>
                  )}
                </button>
              </div>
            </form>            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Deposit;