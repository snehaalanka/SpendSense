const SettingsList = () => {
  return (
    <div className="settings-card">

      <div className="setting-item">
        <span>Reminder</span>
        <span>Daily at 08:00 PM</span>
      </div>

      <div className="setting-item">
        <span>Notifications</span>
        <span>Enabled</span>
      </div>

      <div className="setting-item">
        <span>Voice Language</span>
        <span>English</span>
      </div>

      <div className="setting-item">
        <span>Currency</span>
        <span>INR (₹)</span>
      </div>

      <div className="setting-item">
        <span>Theme</span>
        <span>Light</span>
      </div>

      <div className="setting-item logout">
        Logout
      </div>

    </div>
  );
};

export default SettingsList;