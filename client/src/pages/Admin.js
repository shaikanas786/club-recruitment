import { useEffect, useState } from "react";
import api from "../api/api";


function Admin(){


const [applications,setApplications] = useState([]);

const [clubs,setClubs] = useState([]);

const [users,setUsers] = useState([]);





useEffect(()=>{


loadApplications();

loadClubs();

loadUsers();


},[]);








function loadApplications(){


api

.get("/api/applications")

.then((res)=>{


setApplications(res.data);


})

.catch((err)=>{


console.log(err);


});


}








function loadClubs(){


api

.get("/api/clubs")

.then((res)=>{


setClubs(res.data);


})

.catch((err)=>{


console.log(err);


});


}








function loadUsers(){


api

.get("/api/users")

.then((res)=>{


setUsers(res.data);


})

.catch((err)=>{


console.log(err);


});


}










function updateStatus(id,status){


api

.put(`/api/applications/${id}`,{


status:status


})


.then(()=>{


alert("Status Updated");


loadApplications();


})


.catch((err)=>{


console.log(err);


});


}







const totalApplications =
applications.length;


const pending =
applications.filter(

(app)=>app.status==="Pending"

).length;




const approved =
applications.filter(

(app)=>app.status==="Approved"

).length;




const rejected =
applications.filter(

(app)=>app.status==="Rejected"

).length;









return(



<div className="container mt-5">





<h2 className="text-center mb-5">

Admin Dashboard

</h2>







<div className="row">





<div className="col-md-3 mb-4">

<div className="card shadow text-center p-4">

<h2>

{clubs.length}

</h2>


<p>

Total Clubs

</p>


</div>

</div>









<div className="col-md-3 mb-4">

<div className="card shadow text-center p-4">


<h2>

{users.length}

</h2>


<p>

Total Students

</p>


</div>

</div>









<div className="col-md-3 mb-4">

<div className="card shadow text-center p-4">


<h2>

{totalApplications}

</h2>


<p>

Applications

</p>


</div>

</div>









<div className="col-md-3 mb-4">

<div className="card shadow text-center p-4">


<h2 className="text-warning">

{pending}

</h2>


<p>

Pending

</p>


</div>

</div>




</div>









<div className="row mb-5">





<div className="col-md-6">


<div className="card shadow p-4 text-center">


<h2 className="text-success">

{approved}

</h2>


<p>

Approved Applications

</p>


</div>


</div>







<div className="col-md-6">


<div className="card shadow p-4 text-center">


<h2 className="text-danger">

{rejected}

</h2>


<p>

Rejected Applications

</p>


</div>


</div>




</div>









<div className="card shadow">


<div className="card-body">



<h4>

Student Applications

</h4>







<table className="table table-hover">


<thead className="table-dark">


<tr>


<th>

Name

</th>


<th>

Club

</th>


<th>

Branch

</th>


<th>

Year

</th>


<th>

Status

</th>


<th>

Action

</th>


</tr>


</thead>








<tbody>


{

applications.map((app)=>(


<tr key={app._id}>


<td>

{app.studentName}

</td>



<td>

{app.clubName}

</td>



<td>

{app.branch}

</td>




<td>

{app.year}

</td>




<td>


{

app.status==="Approved" ?


<span className="badge bg-success">

Approved

</span>



:


app.status==="Rejected" ?



<span className="badge bg-danger">

Rejected

</span>



:


<span className="badge bg-warning">

Pending

</span>



}



</td>






<td>



<button

className="btn btn-success btn-sm me-2"

onClick={()=>updateStatus(

app._id,

"Approved"

)}

>

Approve

</button>







<button

className="btn btn-danger btn-sm"

onClick={()=>updateStatus(

app._id,

"Rejected"

)}

>

Reject

</button>



</td>





</tr>



))


}



</tbody>




</table>



</div>


</div>





</div>


);


}


export default Admin;