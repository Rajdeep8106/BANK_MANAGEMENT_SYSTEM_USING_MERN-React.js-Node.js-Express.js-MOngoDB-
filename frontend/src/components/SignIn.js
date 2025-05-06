import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import loginImage from "../assets/bankimage3.jpg";
const SignIn = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });
      if (response.status === 200) {
        setShowConfetti(true);
        Swal.fire({
          title: "🎉 Welcome Back!",
          text: "Your financial dashboard is ready. Secure transactions, real-time insights, and banking at your fingertips!",
          icon: "success",
          confirmButtonText: "Go to Dashboard",
          allowOutsideClick: false,
        }).then(() => {
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          navigate("/dashboard/checkbalance");
        });
        setTimeout(() => setShowConfetti(false), 4000);
      }
    } catch (error) {
      Swal.fire({
        title: "🚨 Login Failed!",
        text: error.response?.data?.message || "Invalid email or password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  return (
    <div className="h-[671px] flex">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="hidden md:block md:w-[1000px]">
        <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a]">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 transition-all duration-300">
          <h2 className="text-4xl font-extrabold text-white text-center mb-4">Welcome Back</h2>
          <p className="text-center text-slate-200 mb-6">Login to access your account</p>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-slate-200 font-semibold">Email</label>
              <div className="flex items-center mt-1 rounded-xl border border-white/20 bg-white/5 shadow-md overflow-hidden">
                <span className="px-4 py-3 text-cyan-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 bg-transparent text-white placeholder-slate-300 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-200 font-semibold">Password</label>
              <div className="flex items-center mt-1 rounded-xl border border-white/20 bg-white/5 shadow-md overflow-hidden">
                <span className="px-4 py-3 text-cyan-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 bg-transparent text-white placeholder-slate-300 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
  <p
    className="text-sm text-cyan-300 hover:text-cyan-400 mt-2 cursor-pointer w-fit"
    onClick={() => navigate("/forgot-password")}
  >
    Forgot Password?
  </p>
</div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition shadow-lg"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-300 mt-5">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
