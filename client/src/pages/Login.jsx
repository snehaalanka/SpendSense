import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      login(data.user, data.token);
      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Login Failed! Please try again."
);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">
          <h2>SpendSense</h2>
        </div>

        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleLogin}>
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
            <div className="password-header">
              <label>Password</label>

              <a href="#">Forgot Password?</a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Log In
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/register">
            <span>Get Started</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;