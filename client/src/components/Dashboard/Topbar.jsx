import "../../styles/Topbar.css";

import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const Topbar = () => {

  const { theme, toggleTheme } = useTheme();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (

    <div className="topbar">

      <div className="topbar-left">

        <h1>

          {greeting},

          <span> Sneha 👋</span>

        </h1>

        <div className="ai-tip">

          <Sparkles size={16}/>

          <p>

            AI predicts you'll save
            <strong> ₹4,200 </strong>
            this month.

          </p>

        </div>

      </div>

      <div className="topbar-right">

        <div className="search-box">

          <Search size={17}/>

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <button
          className="top-icon"
          onClick={toggleTheme}
        >

          {theme==="light"
          ?
          <Moon size={18}/>
          :
          <Sun size={18}/>
          }

        </button>

        <button className="top-icon">

          <Bell size={18}/>

          <span className="notification-dot"></span>

        </button>

        <button className="month-btn">

          June

          <ChevronDown size={16}/>

        </button>

        <div className="profile">

          <img
          src="https://i.pravatar.cc/150?img=32"
          alt=""
          />

        </div>

      </div>

    </div>

  );

};

export default Topbar;