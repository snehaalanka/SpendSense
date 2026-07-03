import "../styles/Login.css";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { loginUser } from "../api/authApi";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const data = await loginUser({

        email,

        password,

      });

      login(data.user, data.token);

      toast.success("Login Successful!");
      navigate("/dashboard");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login Failed! Please try again."

      );

    }

    finally{

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        {/* Logo */}

        <div className="logo">

          <h2>

            SpendSense

          </h2>

        </div>

        {/* Header */}

        <div className="login-header">

          <h2>

            Welcome Back 

          </h2>

          <p>

            Sign in to continue managing your expenses.

          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input

              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              required

            />

          </div>

          <div className="input-group">

            <div className="password-header">

              <label>Password</label>

              <a href="#">

                Forgot Password?

              </a>

            </div>

            <div className="password-box">

              <input

                type={showPassword ? "text" : "password"}

                placeholder="Enter your password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                required

              />

              <button

                type="button"

                className="password-toggle"

                onClick={()=>

                  setShowPassword(!showPassword)

                }

              >

                {

                  showPassword

                  ?

                  <EyeOff size={20}/>

                  :

                  <Eye size={20}/>

                }

              </button>

            </div>

          </div>

          <button

            type="submit"

            className="login-btn"

            disabled={loading}

          >

            {

              loading

              ?

              "Logging In..."

              :

              "Log In"

            }

          </button>

        </form>

        {/* Footer */}

        <p className="signup-text">

          Don't have an account?{" "}

          <Link to="/register">

            <span>

              Create Account

            </span>

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;