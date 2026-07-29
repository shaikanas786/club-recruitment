import { useEffect, useState } from "react";
import api from "../api/api";

function Applications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    api
      .get(`/api/applications/student/${user.email}`)
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Applications...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Applications</h2>

      {applications.length === 0 ? (
        <div className="alert alert-info text-center">
          You have not applied to any clubs yet.
        </div>
      ) : (
        <div className="row">
          {applications.map((application) => (
            <div className="col-md-6 mb-4" key={application._id}>
              <div className="card shadow h-100">
                <div className="card-body">

                  <h4 className="card-title">
                    {application.clubName}
                  </h4>

                  <p>
                    <strong>Name:</strong>{" "}
                    {application.studentName}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {application.studentEmail}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}

                    {application.status === "Pending" && (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}

                    {application.status === "Approved" && (
                      <span className="badge bg-success">
                        Approved
                      </span>
                    )}

                    {application.status === "Rejected" && (
                      <span className="badge bg-danger">
                        Rejected
                      </span>
                    )}

                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Applications;