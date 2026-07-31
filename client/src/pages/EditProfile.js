import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });

  const [profileImage, setProfileImage] = useState(null);

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  }

  function handleFileChange(e) {
    setProfileImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("password", profile.password);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await api.put(
        `/api/users/update/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Profile Update Failed"
      );
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter new password"
                  value={profile.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <button
                className="btn btn-primary w-100"
                type="submit"
              >
                Save Changes
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;