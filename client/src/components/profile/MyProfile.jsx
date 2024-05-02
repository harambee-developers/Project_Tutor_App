import React from "react";
import EditableTextBox from "../features/EditableTextBox";

const MyProfile = ({results}) => {
  return (
    <div>
      <section id="profile-section">
        <h1 className="font-semibold text-gray-700 text-xl">My Profile</h1>
        <div className="mt-2">
          <div className="flex mt-5 text-gray-700">
            <span>UserName:</span>
            <EditableTextBox
              initialSTate={results.username}
              isEditable={true}
              className="px-20"
            />
          </div>
          <div className="flex mt-5 text-gray-700">
            <span>Email:</span>
            <EditableTextBox
              initialSTate={results.email}
              isEditable={true}
              className="px-20"
            />
          </div>
          <div className="flex mt-5 text-gray-700">
            <span>Biography:</span>
            <EditableTextBox
              initialSTate={results.profile.bio}
              isEditable={true}
              className="px-20"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
