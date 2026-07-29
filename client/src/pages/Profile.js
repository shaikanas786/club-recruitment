import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Profile.css";


function Profile() {


  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [applications, setApplications] = useState([]);



  useEffect(()=>{


    if(user){


      api.get(
        `/api/applications/student/${user.email}`
      )

      .then((res)=>{

        setApplications(res.data);

      })

      .catch((err)=>{

        console.log(err);

      });


    }


  }, []);





  function logout(){

    localStorage.removeItem("user");

    navigate("/login");

  }





  return (

    <div className="profile-page">


      <div className="profile-card">


        <div className="profile-cover"></div>



        <div className="profile-image">


          {
            user?.profileImage ?

            <img

              src={user.profileImage}

              alt="Profile"

            />

            :

            <div className="default-avatar">

              👤

            </div>

          }


        </div>





        <div className="profile-body">


          <h2>

            {user?.name}

          </h2>



          <span className="role-badge">

            {user?.role}

          </span>






          <div className="info-container">


            <div className="info-card">


              <h5>
                📧 Email
              </h5>


              <p>
                {user?.email}
              </p>


            </div>





            <div className="info-card">


              <h5>
                🎓 Account Type
              </h5>


              <p>

                {
                  user?.role === "admin"
                  ?
                  "Administrator"
                  :
                  "Student"
                }

              </p>


            </div>


          </div>







          {/* Applications */}


          <div className="applications-section">


            <h4>

              📌 My Applications

            </h4>




            {

              applications.length === 0 ?

              (

                <p className="text-muted">

                  No applications yet

                </p>

              )


              :


              applications.map((app)=>(


                <div

                  className="application-card"

                  key={app._id}

                >


                  <h5>

                    {app.clubName}

                  </h5>



                  {

                    app.status === "Approved" &&

                    <span className="badge bg-success">

                      Approved

                    </span>

                  }




                  {

                    app.status === "Pending" &&

                    <span className="badge bg-warning text-dark">

                      Pending

                    </span>

                  }





                  {

                    app.status === "Rejected" &&

                    <span className="badge bg-danger">

                      Rejected

                    </span>

                  }



                </div>


              ))


            }


          </div>







          <div className="profile-actions">


            <button

              className="edit-profile"

              onClick={() =>
                navigate("/edit-profile")
              }

            >

              ✏ Edit Profile

            </button>





            <button

              className="logout-profile"

              onClick={logout}

            >

              Logout

            </button>



          </div>



        </div>


      </div>


    </div>

  );

}


export default Profile;