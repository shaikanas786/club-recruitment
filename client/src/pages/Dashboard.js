import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";


function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [applications, setApplications] = useState([]);


  useEffect(() => {

    if(user) {

      api
        .get(`/api/applications/student/${user.email}`)
        .then((res)=>{

          setApplications(res.data);

        })
        .catch((err)=>{

          console.log(err);

        });

    }

  }, [user]);



  const pending = applications.filter(
    (app)=>app.status==="Pending"
  ).length;



  const approved = applications.filter(
    (app)=>app.status==="Approved"
  ).length;



  const rejected = applications.filter(
    (app)=>app.status==="Rejected"
  ).length;




  return (

    <div className="container mt-5">


      {/* Welcome Section */}

      <div className="card shadow border-0 p-5 text-center">

        <h1 className="fw-bold">

          Welcome, {user?.name} 🎓

        </h1>


        <p className="lead mt-3">

          Explore clubs, apply for opportunities,
          and build your skills.

        </p>


      </div>




      {/* Statistics */}


      <div className="row mt-5">


        <div className="col-md-4 mb-3">

          <div className="card shadow text-center p-4">

            <h1>
              📄
            </h1>

            <h4>
              Total Applications
            </h4>

            <h2 className="text-primary">
              {applications.length}
            </h2>

          </div>

        </div>




        <div className="col-md-4 mb-3">

          <div className="card shadow text-center p-4">

            <h1>
              ⏳
            </h1>

            <h4>
              Pending
            </h4>

            <h2 className="text-warning">
              {pending}
            </h2>

          </div>

        </div>




        <div className="col-md-4 mb-3">

          <div className="card shadow text-center p-4">

            <h1>
              ✅
            </h1>

            <h4>
              Approved
            </h4>

            <h2 className="text-success">
              {approved}
            </h2>

          </div>

        </div>


      </div>




      {/* Quick Actions */}


      <h2 className="text-center mt-5 mb-4">

        Quick Actions

      </h2>



      <div className="row">


        <div className="col-md-4 mb-3">

          <div className="card shadow p-4 text-center">


            <h2>
              🏫
            </h2>


            <h5>
              Explore Clubs
            </h5>


            <Link

              to="/"

              className="btn btn-primary mt-2"

            >

              View Clubs

            </Link>


          </div>

        </div>




        <div className="col-md-4 mb-3">

          <div className="card shadow p-4 text-center">


            <h2>
              📋
            </h2>


            <h5>
              My Applications
            </h5>


            <Link

              to="/applications"

              className="btn btn-success mt-2"

            >

              Check Status

            </Link>


          </div>

        </div>




        <div className="col-md-4 mb-3">

          <div className="card shadow p-4 text-center">


            <h2>
              👤
            </h2>


            <h5>
              My Profile
            </h5>


            <Link

              to="/profile"

              className="btn btn-dark mt-2"

            >

              View Profile

            </Link>


          </div>

        </div>


      </div>



    </div>

  );

}


export default Dashboard;