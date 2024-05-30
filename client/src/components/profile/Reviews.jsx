import React from "react";

const Reviews = () => {
  return (
    <div className="p-4">
      <section id="review-section">
        <div>
          <h1 className="font-semibold text-gray-700 text-xl mb-2 p-4">Reviews</h1>
          <table className="min-w-full bg-white border-collapse divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Comment
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

export default Reviews;
