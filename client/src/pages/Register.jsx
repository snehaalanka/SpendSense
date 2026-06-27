import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
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

        <form>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <div className="input-group">
            <label>Monthly Budget (Optional)</label>
            <input
              type="number"
              placeholder="₹ Enter amount"
            />
          </div>

         <button className="register-btn" onClick={() => navigate("/login")}>
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