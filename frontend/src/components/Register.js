import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import registerImage from "../assets/bankimage3.jpg";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountNumber: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);

      const userData = {
        name: formData.name,
        email: formData.email,
        accountNumber: formData.accountNumber,
        phone: formData.phone,
        balance: 0,
        accountType: "Savings",
      };

      login(userData);

      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        navigate("/signin");
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Registration failed!";
      Swal.fire("Error", errMsg, "error");
    }
  };

  return (
    <div className="h-[671px] flex">
      <div className="hidden md:block md:w-[1000px]">
        <img src={registerImage} alt="Register" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-cyan-800 to-teal-800 mt-[60px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-10 backdrop-blur-xl p-10 rounded-xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-4xl font-extrabold text-white mb-3 text-center">Create Account</h2>
          <p className="text-teal-100 mb-6 text-center">Join us and bank with style!</p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 border border-white bg-white bg-opacity-5 text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 border border-white bg-white bg-opacity-5 text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full p-3 mb-3 border border-white bg-white bg-opacity-5 text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 mb-3 border border-white bg-white bg-opacity-5 text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-white bg-white bg-opacity-5 text-white rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition shadow-xl"
          >
            Register
          </button>

          <p className="text-center text-teal-100 mt-4">
            Already have an account?{" "}
            <span
              className="text-white cursor-pointer font-semibold hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
