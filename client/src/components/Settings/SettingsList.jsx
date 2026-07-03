import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";

import {
  User,
  Palette,
  Bell,
  Globe,
  Shield,
  LogOut,
  Pencil,
  Save,
  Lock,
} from "lucide-react";

const SettingsList = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [profile, setProfile] = useState({
    name: "Uday Kumar",
    email: "uday@email.com",
    phone: "+91 9876543210",
    occupation: "Student",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    toast.success("Profile Updated Successfully");
    setShowProfileForm(false);
  };

  const updatePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password Updated Successfully");
    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordForm(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* ===========================
          PROFILE CARD
      =========================== */}
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <span>{profile.occupation}</span>
            <p>{profile.email}</p>
          </div>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => setShowProfileForm(!showProfileForm)}
        >
          <Pencil size={16} />
          &nbsp;
          Edit Profile
        </button>
      </div>

      {/* ===========================
          EDIT PROFILE CARD
      =========================== */}
      {showProfileForm && (
        <div className="edit-profile-card">
          <h3>Edit Profile</h3>
          <div className="profile-form">
            <div className="profile-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="profile-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="profile-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </div>
            <div className="profile-group">
              <label>Occupation</label>
              <input
                type="text"
                name="occupation"
                value={profile.occupation}
                onChange={handleProfileChange}
              />
            </div>
            <div className="profile-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowProfileForm(false)}
              >
                Cancel
              </button>
              <button
                className="save-btn"
                onClick={saveProfile}
              >
                <Save size={16} />
                &nbsp;
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===========================
          SETTINGS GRID
      =========================== */}
      <div className="settings-grid">
        {/* Appearance */}
        <div className="setting-card">
          <div className="setting-title">
            <Palette size={20} />
            <div>
              <h3>Appearance</h3>
              <p>Customize application appearance</p>
            </div>
          </div>
          <div className="setting-row">
            <div className="setting-name">
              <span>Dark Mode</span>
              <small>Enable dark theme</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="setting-card">
          <div className="setting-title">
            <Bell size={20} />
            <div>
              <h3>Notifications</h3>
              <p>Expense reminders & alerts</p>
            </div>
          </div>
          <div className="setting-row">
            <div className="setting-name">
              <span>Expense Notifications</span>
              <small>Receive expense reminders</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="setting-card">
          <div className="setting-title">
            <Globe size={20} />
            <div>
              <h3>Preferences</h3>
              <p>Language & Currency</p>
            </div>
          </div>
          <div className="setting-row">
            <div className="setting-name">
              <span>Currency</span>
            </div>
            <select className="setting-select">
              <option>INR ₹</option>
              <option>USD $</option>
              <option>EUR €</option>
            </select>
          </div>
          <div className="setting-row">
            <div className="setting-name">
              <span>Language</span>
            </div>
            <select className="setting-select">
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
            </select>
          </div>
        </div>

        {/* Security */}
        <div className="setting-card">
          <div className="setting-title">
            <Shield size={20} />
            <div>
              <h3>Security</h3>
              <p>Password & account protection</p>
            </div>
          </div>
          <div className="setting-row">
            <div className="setting-name">
              <span>Change Password</span>
              <small>Update your account password</small>
            </div>
            <button
              className="edit-profile-btn"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* ===========================
          PASSWORD CARD
      =========================== */}
      {showPasswordForm && (
        <div className="password-card">
          <h3>Change Password</h3>
          <div className="password-form">
            <div className="password-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="password-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="password-group full-width">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="password-buttons">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPassword({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="update-password-btn"
                onClick={updatePassword}
              >
                <Lock size={16} />
                &nbsp;
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===========================
          LOGOUT
      =========================== */}
      <div className="logout-card">
        <div className="setting-row">
          <div className="setting-name">
            <span>Logout</span>
            <small>Sign out from SpendSense</small>
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={16} />
            &nbsp;
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsList;