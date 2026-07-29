import { useEffect, useState } from "react";
import api from "../api/api";


function AdminClubs() {


  const [clubs, setClubs] = useState([]);



  const [newClub, setNewClub] = useState({

    clubName:"",
    description:"",
    faculty:"",
    recruitmentOpen:true,
    image:""

  });



  const [editId, setEditId] = useState(null);





  function loadClubs(){


    api.get("/api/clubs")

    .then((res)=>{


      setClubs(res.data);


    })


    .catch((err)=>{


      console.log(err);


    });


  }






  useEffect(()=>{


    loadClubs();


  },[]);







  function handleChange(e){


    const {name,value,type,checked}=e.target;


    setNewClub({

      ...newClub,

      [name]:

      type==="checkbox"

      ?

      checked

      :

      value

    });


  }







  function saveClub(e){


    e.preventDefault();



    if(editId){



      api.put(

        `/api/clubs/${editId}`,

        newClub

      )


      .then(()=>{


        alert("Club Updated");


        resetForm();


        loadClubs();


      })



    }

    else{


      api.post(

        "/api/clubs",

        newClub

      )


      .then(()=>{


        alert("Club Added");


        resetForm();


        loadClubs();


      })


    }



  }







  function editClub(club){



    setEditId(club._id);



    setNewClub({


      clubName:club.clubName,

      description:club.description,

      faculty:club.faculty || "",

      recruitmentOpen:club.recruitmentOpen,

      image:club.image || ""


    });



  }







  function deleteClub(id){



    const confirmDelete =
      window.confirm(
        "Delete this club?"
      );



    if(confirmDelete){


      api.delete(

        `/api/clubs/${id}`

      )


      .then(()=>{


        alert("Club Deleted");


        loadClubs();


      });


    }



  }







  function resetForm(){


    setEditId(null);


    setNewClub({

      clubName:"",
      description:"",
      faculty:"",
      recruitmentOpen:true,
      image:""

    });


  }








  return (

    <div className="container mt-5">


      <h2>

        Club Management

      </h2>





      <form

        onSubmit={saveClub}

        className="card p-4 mt-4"

      >



        <input

          className="form-control mb-3"

          name="clubName"

          placeholder="Club Name"

          value={newClub.clubName}

          onChange={handleChange}

          required

        />




        <textarea

          className="form-control mb-3"

          name="description"

          placeholder="Description"

          value={newClub.description}

          onChange={handleChange}

          required

        />





        <input

          className="form-control mb-3"

          name="faculty"

          placeholder="Faculty Name"

          value={newClub.faculty}

          onChange={handleChange}

        />





        <input

          className="form-control mb-3"

          name="image"

          placeholder="Image Name (Codex.jpg)"

          value={newClub.image}

          onChange={handleChange}

        />





        <div className="mb-3">


          <label>

            <input

              type="checkbox"

              name="recruitmentOpen"

              checked={newClub.recruitmentOpen}

              onChange={handleChange}

            />

            {" "} Recruitment Open

          </label>


        </div>





        <button className="btn btn-primary">


          {

            editId

            ?

            "Update Club"

            :

            "Add Club"

          }


        </button>




      </form>







      <h3 className="mt-5">

        Existing Clubs

      </h3>







      {

        clubs.map((club)=>(


          <div

            className="card p-3 mt-3"

            key={club._id}

          >



            <h4>

              {club.clubName}

            </h4>




            <p>

              {club.description}

            </p>




            <p>

              Faculty: {club.faculty}

            </p>




            <p>

              Recruitment:

              {

                club.recruitmentOpen

                ?

                " Open"

                :

                " Closed"

              }

            </p>





            <p>

              Image: {club.image}

            </p>





            <button

              className="btn btn-warning me-2"

              onClick={()=>editClub(club)}

            >

              Edit

            </button>





            <button

              className="btn btn-danger"

              onClick={()=>deleteClub(club._id)}

            >

              Delete

            </button>




          </div>


        ))

      }



    </div>


  );


}


export default AdminClubs;