import React, { useState } from "react";

const EditableTextBox = ({ initialSTate, rows, childData}) => {
  const [text, setText] = useState(initialSTate);

  const handleInputChange = (e) => {
    const data = e.target.value;
    setText(data);
    console.log(data)
  };

  return (
    <div className="w-1/2">
        <textarea
          type="text"
          value={text}
          onChange={handleInputChange}
          className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
          rows={rows}
        />
    </div>
  );
};

export default EditableTextBox;
