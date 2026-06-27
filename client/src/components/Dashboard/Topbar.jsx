import "../../styles/Topbar.css";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <header className="topbar">

      <div className="topbar-left">
        <h2>Hello, Sneha 👋</h2>
        <p>Here's your financial overview</p>
      </div>

      <div className="topbar-right">

        <div className="month-box">
          June 2026
        </div>

        <img
          src="https://i.pravatar.cc/100?img=32"
          alt="Profile"
          className="profile-avatar"
          onClick={() => navigate("/profile")}
        />

      </div>

    </header>
  );
};

export default Topbar;