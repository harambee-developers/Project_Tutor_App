import React from "react";
import EditableTextBox from "../features/EditableTextBox";

const MyProfile = ({ results }) => {
  return (
    <div>
      <form className="space-y-4">
        <h1 className="font-semibold text-gray-700 text-xl">My Profile</h1>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field1" className="w-1/3 px-2">
            UserName:
          </label>
          <EditableTextBox initialSTate={results.username} isEditable={true} rows="1" />
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field2" className="w-1/3 px-2">
            Email:
          </label>
          <EditableTextBox initialSTate={results.email} isEditable={true} rows="1" />
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field3" className="w-1/3 px-2">
            Biography:
          </label>
          <EditableTextBox
            initialSTate={results.profile.bio}
            isEditable={true}
            rows="4"
          />
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
