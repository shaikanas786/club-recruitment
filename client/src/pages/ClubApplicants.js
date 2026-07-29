import { 
    useEffect, 
    useState, 
    useCallback 
} from "react";

import { useParams, Link } from "react-router-dom";

import api from "../api/api";


function ClubApplicants(){


    const { clubName } = useParams();


    const [applications,setApplications] = useState([]);





    const loadApplicants = useCallback(()=>{


        api

        .get(`/api/applications/club/${clubName}`)

        .then((res)=>{


            setApplications(res.data);


        })

        .catch((err)=>{


            console.log(err);


        });



    },[clubName]);







    useEffect(()=>{


        loadApplicants();


    },[loadApplicants]);









    function updateStatus(id,status){



        api

        .put(`/api/applications/${id}`,{


            status:status


        })


        .then(()=>{


            alert(

                `Application ${status}`

            );


            loadApplicants();


        })


        .catch((err)=>{


            console.log(err);


        });



    }








return(


<div className="container mt-5">



<h2 className="text-center mb-4">

{clubName} Applicants

</h2>






<div className="card shadow">


<div className="card-body">





{

applications.length===0 ?


(


<h5 className="text-center">

No Applications Found

</h5>


)



:



(


<table className="table table-hover">


<thead className="table-dark">


<tr>


<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Branch</th>

<th>Year</th>

<th>Reason</th>

<th>Status</th>

<th>Action</th>


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

{app.studentEmail}

</td>




<td>

{app.phone}

</td>




<td>

{app.branch}

</td>




<td>

{app.year}

</td>




<td>

{app.reason}

</td>






<td>


{


app.status==="Approved"


?


<span className="badge bg-success">

Approved

</span>



:


app.status==="Rejected"



?


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



)


}





<Link

to="/admin/clubs"

className="btn btn-secondary"

>

Back

</Link>





</div>


</div>



</div>


);


}


export default ClubApplicants;