import React from "react";
import { useNavigate } from "react-router-dom";
import bankImage from "../assets/hero.png"; 
const BankingSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white min-h-screen flex flex-col justify-center items-center px-6 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-6">
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-5xl font-bold">
            Banking Has Become <span className="text-blue-400">Easy</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
            Manage your transactions easily with our secure and fast banking platform.
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-600 px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 
              backdrop-blur-md bg-opacity-70 hover:bg-purple-500 hover:text-white 
              hover:shadow-lg hover:shadow-purple-400"
              onClick={() => navigate("/register")}
            >
              Let's Get Started
            </button>
            <button
              className="border border-blue-500 px-6 py-3 rounded-full text-lg font-bold text-blue-400 
              bg-transparent backdrop-blur-md transition-all duration-300 
              hover:bg-green-500 hover:text-white hover:border-green-400 
              hover:shadow-lg hover:shadow-green-400"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center mt-3 md:mt-1">
          <img
            src={bankImage}
            alt="Banking Illustration"
            className="w-[600px] h-[600px] object-contain relative z-10"
          />
        </div>
      </div>
      <div className="mt-[-80px] text-center">  
        <h2 className="text-3xl font-bold">Track Your Budget</h2>
        <p className="text-gray-400 text-lg mt-0.5">
          You can easily calculate your budget, keep track of income and expenses.
        </p>
      </div>
    </div>
  );
};
export default BankingSection;
