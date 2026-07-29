import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";


function ClubDetails() {


  const { id } = useParams();


  const [club, setClub] = useState(null);

  const [error, setError] = useState("");




  useEffect(() => {


    console.log("Club ID:", id);


    api
      .get(`/api/clubs/${id}`)

      .then((res) => {

        console.log("Club Data:", res.data);

        setClub(res.data);

      })

      .catch((err) => {

        console.log("API Error:", err);

        setError("Club details not found");

      });


  }, [id]);





  function getImage(image) {

    return image
      ? `https://club-recruitment.onrender.com/uploads/${image}`
      : "https://via.placeholder.com/300";

  }






  if (error) {


    return (

      <div className="container mt-5 text-center">

        <div className="alert alert-danger">

          {error}

        </div>


        <Link
          to="/"
          className="btn btn-primary"
        >

          Go Back

        </Link>


      </div>

    );

  }







  if (!club) {


    return (

      <div className="container mt-5 text-center">

        <h3>
          Loading Club Details...
        </h3>

      </div>

    );

  }






  return (

    <div className="container mt-5 mb-5">


      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">



        <img

          src={getImage(club.image)}

          alt={club.clubName}

          className="card-img-top"

          style={{

            height: "350px",

            width: "100%",

            objectFit: "cover"

          }}

        />





        <div className="card-body p-5">



          <h1 className="fw-bold text-primary">

            {club.clubName}

          </h1>





          <p className="mt-3 fs-5 text-muted">

            {club.description}

          </p>





          <hr />





          <div className="row mt-4">



            <div className="col-md-6">


              <h5>
                👨‍🏫 Faculty
              </h5>


              <p>
                {club.faculty}
              </p>


            </div>





            <div className="col-md-6">


              <h5>
                📌 Recruitment Status
              </h5>




              {

                club.recruitmentOpen ?


                <span className="badge bg-success fs-6">

                  Recruitment Open

                </span>


                :


                <span className="badge bg-danger fs-6">

                  Recruitment Closed

                </span>

              }



            </div>


          </div>






          <div className="mt-5">



            {

              club.recruitmentOpen &&


              <Link

                to="/apply"

                state={{

                  clubName: club.clubName

                }}

                className="btn btn-primary me-3"

              >

                Apply Now

              </Link>


            }






            <Link

              to="/"

              className="btn btn-secondary"

            >

              Back To Clubs

            </Link>




          </div>





        </div>



      </div>



    </div>


  );


}


export default ClubDetails;