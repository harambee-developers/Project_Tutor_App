import React from "react";

const Subjects = () => {
  return (
    <div>
      <section className="subjects-section">
        <div>
          <h1 className="font-semibold text-gray-700 text-xl">Subjects</h1>
          <table className="min-w-full bg-white border-collapse divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Subjects
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Qualification
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200"></tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Subjects;
