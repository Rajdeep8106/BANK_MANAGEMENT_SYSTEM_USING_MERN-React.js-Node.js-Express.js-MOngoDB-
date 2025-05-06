import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BankingSection from "./components/BankingSection";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Services from "./components/Services";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import TransactionHistory from "./pages/TransactionHistory";
import Loan from "./pages/Loan"; 
import Complaint from "./pages/Complaint";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Checkbalance from "./pages/Checkbalance";
import Statement from "./pages/Statement";
import { UserProvider } from "./context/UserContext";
import {BalanceProvider } from "./context/BalanceContext";
import Contact from "./components/Contact";
const App = () => {
  return (
    <UserProvider> 
     <BalanceProvider>
     <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<><BankingSection/><Services/><About/><Contact/></>} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<h2>Welcome to Your Dashboard</h2>} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transactionhistory" element={<TransactionHistory />} />
            <Route path="loan" element={<Loan />} />
            <Route path="statement" element={<Statement />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="help" element={<Help />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkbalance" element={<Checkbalance />} />
          </Route>
        </Routes>
      </Router>
     </BalanceProvider>
    </UserProvider>
  );
};

export default App;