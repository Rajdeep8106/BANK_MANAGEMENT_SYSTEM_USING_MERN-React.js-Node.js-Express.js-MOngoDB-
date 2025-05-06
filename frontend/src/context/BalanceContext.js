import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const BalanceContext = createContext();
export const BalanceProvider = ({ children, userAccountNumber }) => {
  const [balance, setBalance] = useState(0);
  const fetchBalance = async (accountNumber) => {
    if (!accountNumber) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/balance/${accountNumber}`);
      setBalance(res.data.balance);
    } catch (err) {
      console.error('Failed to fetch balance', err);
    }
  };
  useEffect(() => {
    if (userAccountNumber) {
      fetchBalance(userAccountNumber);
    }
  }, [userAccountNumber]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance, fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};