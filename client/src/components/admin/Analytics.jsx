import React from "react";
import { Chart, registerables } from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useRef, useEffect } from "react";

// Register Chart.js components
Chart.register(...registerables);

const Analytics = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const sessionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Sessions Conducted",
        data: [12, 19, 15, 22],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const studentProgressData = {
    labels: ["Student A", "Student B", "Student C", "Student D"],
    datasets: [
      {
        label: "Progress",
        data: [75, 85, 60, 90],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const tutorPerformanceData = {
    labels: ["Tutor A", "Tutor B", "Tutor C"],
    datasets: [
      {
        label: "Hours Tutored",
        data: [40, 35, 45],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Revenue",
        data: [1000, 1500, 1200, 1800],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    // Cleanup function to destroy the chart instance before unmounting or re-rendering
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Session Metrics */}
      <div className="bg-white shadow p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Sessions Conducted</h3>
        <div className="h-64">
          <Line data={sessionData} />
        </div>
      </div>
      {/* Student Progress */}
      <div className="bg-white shadow p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Student Progress</h3>
        <div className="h-64">
          <Bar data={studentProgressData} />
        </div>
      </div>
      {/* Tutor Performance */}
      <div className="bg-white shadow p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Tutor Performance</h3>
        <div className="h-64">
          <Doughnut data={tutorPerformanceData} />
        </div>
      </div>
      {/* Revenue Metrics */}
      <div className="bg-white shadow p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Revenue</h3>
        <div className="h-64">
          <Bar data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
