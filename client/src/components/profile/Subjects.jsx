import React, { useState, useEffect } from "react";
import { useAuth } from "../features/AuthContext";
import axios from "axios";

const Subjects = ({ initialSubjects = [] }) => {
  const [rows, setRows] = useState(initialSubjects.length > 0 ? initialSubjects : [
    {
      subject: "",
      qualification: "",
      price: "",
    },
  ]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialSubjects.length > 0) {
      setRows(initialSubjects);
    }
  }, [initialSubjects]);

  const addRow = () => {
    setRows([...rows, { subject: "", qualification: "", price: "" }]);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const curriculumLevels = [
    { id: 1, name: "KS1" },
    { id: 2, name: "KS2" },
    { id: 3, name: "KS3" },
    { id: 4, name: "GCSE" },
    { id: 5, name: "A-Level" },
    { id: 6, name: "IB" },
    { id: 7, name: "Undergraduate" },
    { id: 8, name: "Postgraduate" },
  ];

  const saveSubjects = async (e) => {
    e.preventDefault();
    if (!rows.every((row) => row.subject && row.qualification && parseFloat(row.price) > 0)) {
      alert("Please fill all the fields correctly.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/subject/${user.userId}`, { subjects: rows });
      console.log("Data:", response.data);
      alert("Data saved successfully");
    } catch (error) {
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error("Error saving data", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4">
    <section className="subjects-section">
      <div className="flex justify-between items-center mb-2 md:flex-row">
        <h1 className="font-semibold text-gray-700 text-xl p-4">Subjects</h1>
        <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition-all duration-300 ease-in-out" onClick={addRow}>
          Add Subject
        </button>
      </div>
      <form onSubmit={saveSubjects}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Qualification</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400">
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                    <input
                      className="border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                      name="subject"
                      value={row.subject}
                      onChange={(e) => handleInputChange(index, "subject", e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className="border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                      name="qualification"
                      value={row.qualification}
                      onChange={(e) => handleInputChange(index, "qualification", e.target.value)}
                    >
                      <option value="">Select Qualification</option>
                      {curriculumLevels.map((level) => (
                        <option key={level.id} value={level.name}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <input
                      className="border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                      type="number"
                      name="price"
                      value={row.price}
                      onChange={(e) => handleInputChange(index, "price", e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteRow(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition-all duration-300 ease-in-out"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  </div>
  );
};

export default Subjects;
