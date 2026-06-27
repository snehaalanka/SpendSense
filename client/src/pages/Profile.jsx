import ProfileCard from "../components/Profile/ProfileCard";
import ProfileForm from "../components/Profile/ProfileForm";

import "../components/Profile/Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage your profile details</p>
      </div>

      <div className="profile-layout">

        <ProfileCard />

        <ProfileForm />

      </div>

    </div>
  );
};

export default Profile;