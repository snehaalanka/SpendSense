const ProfileForm = () => {
  return (
    <div className="profile-form">

      <div className="form-group">
        <label>Full Name</label>
        <input value="Sneha Sharma" />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input value="sneha@gmail.com" />
      </div>

      <div className="form-group">
        <label>Monthly Budget</label>
        <input value="10000" />
      </div>

      <div className="form-group">
        <label>Currency</label>
        <select>
          <option>INR (₹)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Time Zone</label>
        <input value="Asia/Kolkata" />
      </div>

    </div>
  );
};

export default ProfileForm;