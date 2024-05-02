import React, { useState } from "react";

const EditableTextBox = ({
  initialSTate,
  isEditable,
  onToggleEdit,
  saveText,
  className
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
          <input type="text" value={text} onChange={handleInputChange} className='rounded' />
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
