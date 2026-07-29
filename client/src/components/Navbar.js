import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import Notifications from "./Notifications";


function Navbar() {


  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );





  function logout(){


    localStorage.removeItem("user");


    navigate("/login");


  }






  return (


    <nav className="navbar-custom">





      <div className="navbar-brand">


        🎓 Club Recruitment


      </div>







      <div className="nav-links">





        <Link

          to="/"

          className="nav-link"

        >

          Home


        </Link>








        {
          user && user.role==="student" &&

          (


          <>


            <Link

              to="/dashboard"

              className="nav-link"

            >

              Dashboard


            </Link>







            <Link

              to="/applications"

              className="nav-link"

            >

              My Applications


            </Link>







            <Link

              to="/profile"

              className="nav-link"

            >

              Profile


            </Link>



          </>


          )


        }









        {
          user?.role==="admin" &&


          (


          <>


            <Link

              to="/admin"

              className="nav-link"

            >

              Applications


            </Link>







            <Link

              to="/admin/clubs"

              className="nav-link"

            >

              Manage Clubs


            </Link>



          </>


          )


        }





      </div>









      <div className="nav-auth">






        {
          user && user.role==="student" &&

          (

            <Notifications />

          )

        }







        {

          !user ?


          (

          <>


            <Link

              to="/login"

              className="nav-link"

            >

              Login


            </Link>







            <Link

              to="/register"

              className="nav-link register-btn"

            >

              Register


            </Link>



          </>



          )



          :



          (


          <>


            <span className="user-info">


              👤 {user.name}


              <small>

                ({user.role})

              </small>


            </span>







            <button

              className="logout-btn"

              onClick={logout}

            >

              Logout


            </button>




          </>



          )



        }





      </div>





    </nav>


  );


}



export default Navbar;