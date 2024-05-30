import { React, useState } from "react";

const Subjects = () => {
  const [rows, setRows] = useState([
    {
      subject: "",
      qualification: "",
      grade: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        subject: "",
        qualification: "",
        grade: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <div className="p-4">
      <section className="subjects-section">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold text-gray-700 text-xl p-4">Subjects</h1>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addRow}
            >
              Add Subject
            </button>
          </div>
          <table className="min-w-full bg-white border-collapse divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Qualification
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400">
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                      value={row.subject}
                      onChange={(e) =>
                        handleInputChange(index, "subject", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                      value={row.qualification}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "qualification",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                      value={row.grade}
                      onChange={(e) =>
                        handleInputChange(index, "grade", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Subjects;
