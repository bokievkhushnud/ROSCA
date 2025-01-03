"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  // Some mock data
  const [chartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Contributions",
        data: [500, 700, 1000, 1200, 1500],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
      },
    ],
  });

  const [chartOptions] = useState({
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Contributions" },
    },
  });

  return (
    <div className="w-full h-64">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}