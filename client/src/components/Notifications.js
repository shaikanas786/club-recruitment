import { 
    useEffect, 
    useState, 
    useCallback 
} from "react";

import api from "../api/api";


function Notifications(){


const user = JSON.parse(
    localStorage.getItem("user")
);



const [notifications,setNotifications] = useState([]);

const [open,setOpen] = useState(false);





const loadNotifications = useCallback(()=>{


    if(user?.email){


        api

        .get(
            `/api/notifications/${user.email}`
        )

        .then((res)=>{


            setNotifications(res.data);


        })


        .catch((err)=>{


            console.log(err);


        });


    }


},[user]);







useEffect(()=>{


    loadNotifications();


},[loadNotifications]);








function readNotification(id){


    api

    .put(
        `/api/notifications/${id}`
    )


    .then(()=>{


        loadNotifications();


    })

    .catch((err)=>{


        console.log(err);


    });


}







function deleteNotification(id){


    api

    .delete(
        `/api/notifications/${id}`
    )


    .then(()=>{


        loadNotifications();


    })

    .catch((err)=>{


        console.log(err);


    });


}







const unread = notifications.filter(

    (item)=>item.read===false

).length;







return(


<div

style={{

position:"relative"

}}

>





<button


className="btn btn-light"


onClick={()=>setOpen(!open)}


>


🔔


{

unread > 0 &&

<span className="badge bg-danger ms-1">

{unread}

</span>

}


</button>







{

open && (


<div

className="card shadow"

style={{

position:"absolute",

right:0,

top:"45px",

width:"350px",

zIndex:1000

}}

>


<div className="card-header fw-bold">

Notifications

</div>







<div className="card-body p-0">



{


notifications.length===0 ?


(


<div className="p-3 text-center">

No Notifications

</div>


)



:


notifications.map((item)=>(


<div

key={item._id}

className="p-3 border-bottom"


style={{

background:item.read
?
"white"
:
"#e7f1ff"

}}


>



<p

style={{

cursor:"pointer",

marginBottom:"10px"

}}

onClick={()=>readNotification(item._id)}

>


{item.message}


</p>






<button

className="btn btn-sm btn-danger"

onClick={()=>deleteNotification(item._id)}

>

Delete

</button>



</div>



))


}





</div>





</div>


)

}



</div>


);


}


export default Notifications;