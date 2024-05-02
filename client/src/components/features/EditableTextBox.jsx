import React, { useState } from "react";

const EditableTextBox = ({
  initialSTate,
  isEditable,
  onToggleEdit,
  saveText,
  className,
  rows,
}) => {
  const [text, setText] = useState(initialSTate);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSaveClick = () => {
    saveText(text); // call the saveTexty function passed from the parent component

    onToggleEdit(false);
    //toggle editable state off
  };

  const handleCancelClick = () => {
    setText(initialSTate);
    onToggleEdit(false);
  };

  return (
    <div>
      {isEditable ? (
        <div className={className}>
          <textarea
            type="text"
            value={text}
            onChange={handleInputChange}
            className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            rows={rows}
          />
        </div>
      ) : (
        <div className={className}>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default EditableTextBox;
