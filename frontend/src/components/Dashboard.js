import React from "react";
import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import {
  FiDollarSign,
  FiCreditCard,
  FiClock,
  FiBriefcase,
  FiAlertCircle, 
  FiFileText,
  FiUser,
  FiLogOut,
  FiBarChart2,
} from "react-icons/fi";
const Dashboard = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "checkbalance", icon: <FiBarChart2 /> },
    { name: "Deposit", path: "deposit", icon: <FiDollarSign /> },
    { name: "Withdraw", path: "withdraw", icon: <FiCreditCard /> },
    { name: "History", path: "transactionhistory", icon: <FiClock /> },
    { name: "Statements", path: "statement", icon: <FiFileText /> },
    { name: "Loan", path: "loan", icon: <FiBriefcase /> },
    { name: "Complaint", path: "complaint", icon: <FiAlertCircle /> },
    { name: "Profile", path: "profile", icon: <FiUser /> },
  ];
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="w-72 bg-gradient-to-b from-indigo-800 to-purple-800 text-white flex flex-col h-screen fixed">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
          <div className="flex-1" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                    location.pathname.includes(item.path)
                      ? "bg-indigo-700 text-white"
                      : "text-gray-300 hover:bg-indigo-700 hover:text-white"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="p-6 py-1 mb-auto mt-[-15px]">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 w-full p-3 rounded-lg transition-colors text-gray-300 hover:bg-red-600 hover:text-white"
          >
            <FiLogOut onClick={handleLogout}className="text-2xl" />
            <span className="text-lg font-medium" >Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-1 ml-72 overflow-hidden">
        <div className="h-screen overflow-y-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;