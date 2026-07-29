import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

function Apply() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const clubName = location.state?.clubName || "";

  const [loading, setLoading] = useState(false);

  const [application, setApplication] = useState({
    studentName: user?.name || "",
    studentEmail: user?.email || "",
    clubName: clubName,
    phone: "",
    branch: "",
    year: "",
    reason: "",
  });

  useEffect(() => {
    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!clubName) {
      alert("Please select a club first.");
      navigate("/");
    }
  }, [user, clubName, navigate]);

  function handleChange(e) {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (application.phone.trim().length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (application.reason.trim().length < 10) {
      alert("Reason should contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/applications",
        application
      );

      alert(response.data.message);

      navigate("/applications");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Application submission failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Club Application Form
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Student Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={application.studentName}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Student Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={application.studentEmail}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Club Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={application.clubName}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={application.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Branch
                  </label>

                  <select
                    className="form-select"
                    name="branch"
                    value={application.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>EEE</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Year
                  </label>

                  <select
                    className="form-select"
                    name="year"
                    value={application.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Why do you want to join this club?
                  </label>

                  <textarea
                    className="form-control"
                    rows="5"
                    name="reason"
                    value={application.reason}
                    onChange={handleChange}
                    placeholder="Tell us why you want to join..."
                    required
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Application"}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apply;