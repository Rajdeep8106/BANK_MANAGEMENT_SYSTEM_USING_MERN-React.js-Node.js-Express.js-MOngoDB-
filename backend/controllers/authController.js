import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { name, accountNumber, phone, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      accountNumber,
      phone,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Email or Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        phone: user.phone,
        balance: user.balance, 
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};