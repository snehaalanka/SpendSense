import "../styles/Register.css";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { registerUser } from "../api/authApi";

import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [monthlyBudget, setMonthlyBudget] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast.error("Passwords do not match!");

      return;

    }
    if (
    !name.trim() ||
    !email.trim() ||
    !password ||
    !confirmPassword
) {
    toast.error("Please fill all required fields.");
    return;
}

if (!/^[A-Za-z ]{3,40}$/.test(name.trim())) {
    toast.error(
        "Name must contain only letters (3-40 characters)."
    );
    return;
}

if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    toast.error("Please enter a valid email.");
    return;
}

if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,50}$/.test(password)
) {
    toast.error(
        "Password must contain uppercase, lowercase, number and special character."
    );
    return;
}

if (
    monthlyBudget &&
    (Number(monthlyBudget) < 100 ||
        Number(monthlyBudget) > 10000000)
) {
    toast.error(
        "Budget must be between ₹100 and ₹10,000,000."
    );
    return;
}


    setLoading(true);

    try {

      await registerUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    monthlyBudget:
        monthlyBudget === ""
            ? undefined
            : Number(monthlyBudget),
});
      

      toast.success("Registration Successful!");

      navigate("/login");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration Failed! Please try again."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        {/* Logo */}

        

        {/* Header */}

        <div className="register-header">

          <h2>

            Create Account 

          </h2>

          <p>

            Start managing your expenses smarter.

          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleRegister}>

          <div className="input-group">

            <label>

              Full Name

            </label>

            <input

              type="text"

              placeholder="Enter your name"

              value={name}

              onChange={(e)=>setName(e.target.value.replace(/\s+/g," "))}

              required

            />

          </div>

          <div className="input-group">

            <label>

              Email

            </label>

            <input

              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              required

            />

          </div>

          {/* Password */}

          <div className="input-group">

            <label>

              Password

            </label>

            <div className="password-box">

              <input

                type={showPassword ? "text" : "password"}

                placeholder="Create password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                required

              />
              <small className="password-hint">
Must contain 8+ characters, uppercase, lowercase,
number and special character.
</small>

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

          {/* Confirm Password */}

          <div className="input-group">

            <label>

              Confirm Password

            </label>

            <div className="password-box">

              <input

                type={

                  showConfirmPassword

                    ? "text"

                    : "password"

                }

                placeholder="Confirm password"

                value={confirmPassword}

                onChange={(e)=>

                  setConfirmPassword(e.target.value)

                }

                required

              />

              <button

                type="button"

                className="password-toggle"

                onClick={()=>

                  setShowConfirmPassword(

                    !showConfirmPassword

                  )

                }

              >

                {

                  showConfirmPassword

                  ?

                  <EyeOff size={20}/>

                  :

                  <Eye size={20}/>

                }

              </button>

            </div>

          </div>

          {/* Monthly Budget */}

          <div className="input-group">

            <label>

              Monthly Budget 

            </label>

            <input

              type="number"
min="100"
max="10000000"
step="1"

              placeholder="₹ Enter amount"

              value={monthlyBudget}

              onChange={(e)=>

                setMonthlyBudget(e.target.value)

              }

            />

          </div>

          <button

            type="submit"

            className="register-btn"

            disabled={loading}

          >

            {

              loading

              ?

              "Creating Account..."

              :

              "Create Account"

            }

          </button>

        </form>

        {/* Footer */}

        <p className="login-text">

          Already have an account?{" "}

          <Link to="/login">

            <span>

              Log In

            </span>

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Register;