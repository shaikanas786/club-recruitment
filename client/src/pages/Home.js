import { useEffect, useState } from "react";
import api from "../api/api";

import ClubCard from "../components/ClubCard";

import Codex from "../assets/Codex.jpg";
import Gstudio from "../assets/Gstudio.jpg";
import Starbursts from "../assets/Starbursts.jpg";

import "./Home.css";


function Home(){


const [clubs,setClubs] = useState([]);





useEffect(()=>{


  api
  .get("/api/clubs")

  .then((res)=>{

    setClubs(res.data);

  })

  .catch((err)=>{

    console.log(err);

  });


},[]);






function getImage(image){


  if(image==="Codex.jpg"){

    return Codex;

  }


  if(image==="Gstudio.jpg"){

    return Gstudio;

  }


  if(image==="Starbursts.jpg"){

    return Starbursts;

  }


  return `http://localhost:3001/uploads/${image}`;


}







return(


<div>



{/* Hero Section */}

<section className="hero-section">


<div className="hero-content">


<h1>

Discover Your College Clubs 🎓

</h1>



<p>

Join clubs, build skills, explore your interests and connect with talented students.

</p>



<a

href="#clubs"

className="btn btn-primary btn-lg"

>

Explore Clubs

</a>


</div>


</section>









{/* Clubs Section */}


<section

id="clubs"

className="container mt-5"

>


<h1 className="text-center fw-bold mb-5">

Available Clubs

</h1>





<div className="row">


{

clubs.length===0 ?


(

<div className="text-center">


<h4>

No Clubs Available

</h4>


</div>

)


:


clubs.map((club)=>(


<div

className="col-lg-4 col-md-6 mb-4"

key={club._id}

>


<div className="club-wrapper">


<ClubCard


image={getImage(club.image)}


title={club.clubName}


description={club.description}


id={club._id}


/>


{

club.recruitmentOpen ?


<span className="status-open">

● Recruitment Open

</span>


:


<span className="status-close">

● Recruitment Closed

</span>


}



</div>



</div>


))


}



</div>


</section>









{/* Why Join Section */}


<section className="why-section">


<h2 className="text-center fw-bold mb-4">

Why Join Clubs?

</h2>




<div className="row container mx-auto">



<div className="col-md-4">


<div className="feature-card">


<h3>

🚀 Skills

</h3>


<p>

Improve technical and creative skills through practical activities.

</p>


</div>


</div>






<div className="col-md-4">


<div className="feature-card">


<h3>

🤝 Network

</h3>


<p>

Meet students and work together on exciting projects.

</p>


</div>


</div>






<div className="col-md-4">


<div className="feature-card">


<h3>

🎯 Experience

</h3>


<p>

Gain experience for internships and future careers.

</p>


</div>


</div>



</div>



</section>





</div>


);


}


export default Home;