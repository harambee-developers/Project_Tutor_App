import { React, useState } from "react";
import Analytics from "../components/admin/Analytics";
import Students from "../components/admin/Students";
import Tutors from "../components/admin/Tutors";
import Settings from "../components/admin/Settings";
import Reports from "../components/admin/Reports";
import { FaGear, FaHouseChimneyUser, FaLeftLong } from "react-icons/fa6";
import { FaBook, FaTable, FaUserGraduate } from "react-icons/fa";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  const tabs = [
    "Dashboard",
    "Students",
    "Tutors",
    "Settings",
    "Reports",
    "Logout",
  ];

  const handleOnClick = (value) => {
    setSelectedTab(value);
  };

  const renderIcon = (option) => {
    switch (option) {
      case "Dashboard":
        return <FaHouseChimneyUser className="inline mr-5" />;
      case "Students":
        return <FaBook className="inline mr-5" />;
      case "Tutors":
        return <FaUserGraduate className="inline mr-5" />;
      case "Settings":
        return <FaGear className="inline mr-5" />;
      case "Reports":
        return <FaTable className="inline mr-5" />;
      case "Logout":
        return <FaLeftLong className="inline mr-5" />;
      default:
        return null;
    }
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return <Analytics />;
      case "Students":
        return <Students />;
      case "Tutors":
        return <Tutors />;
      case "Settings":
        return <Settings />;
      case "Reports":
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-64 bg-teal-600 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <ul className="mt-6">
          {tabs.map((option) => (
            <li key={option} className="px-6 py-3 hover:bg-blue-700 text-white">
              <button onClick={() => handleOnClick(option)} className="block">
                {renderIcon(option)}
                {option}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-6">
        <header className="bg-white shadow p-6 rounded-md mb-6">
          <h2 className="text-2xl font-semibold">Welcome, Admin</h2>
        </header>
        <section className="flex-1">{renderComponent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;
