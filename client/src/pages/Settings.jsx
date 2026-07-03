import SettingsList from "../components/Settings/SettingsList";

import "../components/Settings/Settings.css";

const Settings = () => {

  return (

    <div className="settings-page">

      <div className="settings-header">

        <h1>

          Settings

        </h1>

        <p>

          Personalize your SpendSense experience and
          manage your account preferences.

        </p>

      </div>

      <SettingsList />

    </div>

  );

};

export default Settings;