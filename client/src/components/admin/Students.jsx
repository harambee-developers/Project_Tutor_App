import { React, useState, useEffect } from "react";
import axios from "axios";
import ConfirmationDelete from "../features/ConfirmationDelete"

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    gender: "",
    location: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const studentsPerPage = 20;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/students`
        );
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.firstname.toLowerCase().includes(filter.name.toLowerCase()) &&
        student.email.toLowerCase().includes(filter.email.toLowerCase()) &&
        student.gender.toLowerCase().includes(filter.gender.toLowerCase()) &&
        student.location.toLowerCase().includes(filter.location.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [filter, students]);

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    const newCheckedItems = {};
    currentStudents.forEach((student) => {
      newCheckedItems[student._id] = checked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleCheckboxChange = (e, studentId) => {
    const checked = e.target.checked;
    setCheckedItems({
      ...checkedItems,
      [studentId]: checked,
    });
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (studentId) => {
    // Implement update functionality
    console.log("Update student", studentId);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/users/delete/${studentId}`
      );
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const toggleDropdown = (studentId) => {
    if (dropdownOpen === studentId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(studentId);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filter.email}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          name="gender"
          placeholder="Filter by gender"
          value={filter.gender}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by location"
          value={filter.location}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white border-b-2">
        <thead>
          <tr>
            <th className="p-2 border-b-2 border-gray-300">
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={selectAll}
              />
            </th>
            <th className="p-2 border-b-2 border-gray-300">First Name</th>
            <th className="p-2 border-b-2 border-gray-300">Last Name</th>
            <th className="p-2 border-b-2 border-gray-300">User Name</th>
            <th className="p-2 border-b-2 border-gray-300">Email</th>
            <th className="p-2 border-b-2 border-gray-300">Gender</th>
            <th className="p-2 border-b-2 border-gray-300">Location</th>
            <th className="p-2 border-b-2 border-gray-300">Action</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-gray-300">
                <input
                  type="checkbox"
                  checked={checkedItems[student._id] || false}
                  onChange={(e) => handleCheckboxChange(e, student._id)}
                />
              </td>
              <td className="py-2 px-4 border-gray-300">{student.firstname}</td>
              <td className="py-2 px-4 border-gray-300">{student.lastname}</td>
              <td className="py-2 px-4 border-gray-300">{student.username}</td>
              <td className="py-2 px-4 border-gray-300">{student.email}</td>
              <td className="py-2 px-4 border-gray-300">{student.gender}</td>
              <td className="py-2 px-4 border-gray-300">{student.location}</td>
              <td className="py-2 px-4 border-gray-300 relative">
                <button
                  onClick={() => toggleDropdown(student._id)}
                  className="focus:outline-none"
                >
                  &hellip; {/* Ellipsis horizontal */}
                </button>
                {dropdownOpen === student._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <button
                      onClick={() => handleUpdate(student._id)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setIsModalDeleteOpen(true)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Delete
                    </button>
                    <ConfirmationDelete
                      isOpen={isModalDeleteOpen}
                      onClose={() => setIsModalDeleteOpen(false)}
                      onConfirm={() => {
                        handleDelete(student._id);
                        setIsModalDeleteOpen(false);
                      }}
                    />
                  </div>
                )}
              </td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            <li className="px-2">
              <button
                onClick={handlePreviousPage}
                className={`px-3 py-2 border border-gray-300 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white"
                }`}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number} className="px-2">
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-2 border border-gray-300 rounded ${
                    currentPage === number + 1 ? "bg-gray-300" : "bg-white"
                  }`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
            <li className="px-2">
              <button
                onClick={handleNextPage}
                className={`px-3 py-2 border border-gray-300 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white"
                }`}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Students;
