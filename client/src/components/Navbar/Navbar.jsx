import "./Navbar.css";
import Button from "../Common/Buttons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">

      <div className="navbar-container">

        <div className="logo">
            SpendSense
        </div>

        <nav className="nav-links">

          <a href="#">Features</a>

          <a href="#">About</a>

          <a href="#">How it works</a>

          <a href="#">Pricing</a>
          
          <Link to="/register">
            <Button text="Get Started" />
          </Link>

        </nav>

      </div>

    </header>
  );
};

export default Navbar;