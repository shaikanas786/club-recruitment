import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

import Codex from "../assets/Codex.jpg";
import Gstudio from "../assets/Gstudio.jpg";
import Starbursts from "../assets/Starbursts.jpg";


function ManageClubs(){


  const [clubs,setClubs] = useState([]);

  const [club,setClub] = useState({

    clubName:"",
    description:"",
    faculty:"",
    recruitmentOpen:true

  });


  const [image,setImage] = useState(null);

  const [editId,setEditId] = useState(null);



  useEffect(()=>{

    fetchClubs();

  },[]);





  function fetchClubs(){

    api
    .get("/api/clubs")

    .then((res)=>{

      setClubs(res.data);

    })

    .catch((err)=>{

      console.log(err);

    });

  }






  function handleChange(e){

    setClub({

      ...club,

      [e.target.name]:e.target.value

    });

  }






  function addOrUpdateClub(e){

    e.preventDefault();


    const formData = new FormData();


    formData.append("clubName",club.clubName);

    formData.append("description",club.description);

    formData.append("faculty",club.faculty);

    formData.append(
      "recruitmentOpen",
      club.recruitmentOpen
    );



    if(image){

      formData.append(
        "image",
        image
      );

    }





    if(editId){


      api.put(

        `/api/clubs/${editId}`,

        formData,

        {

          headers:{

            "Content-Type":"multipart/form-data"

          }

        }

      )

      .then(()=>{

        alert("Club Updated");

        resetForm();

        fetchClubs();

      });


    }

    else{


      api.post(

        "/api/clubs",

        formData,

        {

          headers:{

            "Content-Type":"multipart/form-data"

          }

        }

      )

      .then(()=>{

        alert("Club Added");

        resetForm();

        fetchClubs();

      });


    }


  }







  function deleteClub(id){


    api.delete(`/api/clubs/${id}`)

    .then(()=>{

      alert("Club Deleted");

      fetchClubs();

    });


  }







  function editClub(c){


    setClub({

      clubName:c.clubName,

      description:c.description,

      faculty:c.faculty,

      recruitmentOpen:c.recruitmentOpen

    });


    setEditId(c._id);


  }







  function resetForm(){

    setClub({

      clubName:"",

      description:"",

      faculty:"",

      recruitmentOpen:true

    });


    setImage(null);

    setEditId(null);

  }







  function getImage(image){


    if(image==="Codex.jpg")
      return Codex;


    if(image==="Gstudio.jpg")
      return Gstudio;


    if(image==="Starbursts.jpg")
      return Starbursts;



    return `http://localhost:3001/uploads/${image}`;


  }







return(

<div className="container mt-5">


<h2 className="text-center mb-4">
Manage Clubs
</h2>





<div className="card shadow p-4">


<form onSubmit={addOrUpdateClub}>


<input

className="form-control mb-3"

name="clubName"

value={club.clubName}

onChange={handleChange}

placeholder="Club Name"

required

/>





<textarea

className="form-control mb-3"

name="description"

value={club.description}

onChange={handleChange}

placeholder="Description"

required

/>





<input

className="form-control mb-3"

name="faculty"

value={club.faculty}

onChange={handleChange}

placeholder="Faculty"

required

/>





<input

type="file"

className="form-control mb-3"

onChange={(e)=>setImage(e.target.files[0])}

/>





<select

className="form-select mb-3"

value={club.recruitmentOpen}

onChange={(e)=>

setClub({

...club,

recruitmentOpen:
e.target.value==="true"

})

}

>


<option value="true">
Open
</option>


<option value="false">
Closed
</option>


</select>






<button className="btn btn-primary w-100">

{

editId ?

"Update Club"

:

"Add Club"

}

</button>


</form>


</div>







<div className="row mt-4">


{

clubs.map((c)=>(


<div

className="col-md-4 mb-4"

key={c._id}

>


<div className="card shadow p-3">





<img

src={getImage(c.image)}

alt={c.clubName}

style={{

height:"200px",

width:"100%",

objectFit:"cover"

}}


/>





<h4 className="mt-3">

{c.clubName}

</h4>





<p>

{c.description}

</p>




<p>

Faculty: {c.faculty}

</p>






<button

className="btn btn-warning me-2"

onClick={()=>editClub(c)}

>

Edit

</button>






<button

className="btn btn-danger"

onClick={()=>deleteClub(c._id)}

>

Delete

</button>






<Link

to={`/admin/applicants/${c.clubName}`}

className="btn btn-primary mt-2 w-100"

>

View Applicants

</Link>





</div>


</div>


))


}



</div>



</div>


);


}


export default ManageClubs;