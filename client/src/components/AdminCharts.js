import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function AdminCharts({ applications }) {
  const pending = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const approved = applications.filter(
    (app) => app.status === "Approved"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const clubCount = {};

  applications.forEach((app) => {
    clubCount[app.clubName] =
      (clubCount[app.clubName] || 0) + 1;
  });

  const pieData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [pending, approved, rejected],
        backgroundColor: [
          "#ffc107",
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(clubCount),
    datasets: [
      {
        label: "Applications",
        data: Object.values(clubCount),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="row mt-5">

      <div className="col-md-6 mb-4">
        <div className="card shadow p-3">
          <h4 className="text-center">
            Applications by Status
          </h4>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card shadow p-3">
          <h4 className="text-center">
            Applications per Club
          </h4>
          <Bar data={barData} />
        </div>
      </div>

    </div>
  );
}

export default AdminCharts;
