import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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

        <form>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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
            />

          </div>

          <button
    className="login-btn"
    onClick={() => navigate("/dashboard")}
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