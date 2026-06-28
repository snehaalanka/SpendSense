import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
     toast.error("Passwords do not match!");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Registration Successful! Please login.");

      navigate("/login");
    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Registration Failed! Please try again."
);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="logo">
          <h2>SpendSense AI</h2>
        </div>

        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join SpendSense AI today</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Monthly Budget (Optional)</label>
            <input
              type="number"
              placeholder="₹ Enter amount"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="register-btn"
          >
            Get Started
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">
            <span>Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;