import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {

  const navigate = useNavigate();


  const [user, setUser] = useState({

    name: "",
    email: "",
    password: ""

  });


  const [showPassword, setShowPassword] = useState(false);



  function handleChange(e) {

    setUser({

      ...user,

      [e.target.name]: e.target.value

    });

  }




  async function handleSubmit(e) {

    e.preventDefault();


    try {

      const response = await api.post(
        "/api/users/register",
        user
      );


      alert(response.data.message);


      navigate("/login");


    }

    catch(error) {


      alert(

        error.response?.data?.message ||
        "Registration Failed"

      );


    }

  }




  return (

    <div className="register-page">


      <div className="register-card">


        <h1>
          🎓
        </h1>


        <h2>
          Create Account
        </h2>


        <p className="text-muted">
          Join the Club Recruitment Portal
        </p>




        <form onSubmit={handleSubmit}>


          <div className="mb-3">


            <label>
              Name
            </label>


            <input

              type="text"

              className="form-control"

              name="name"

              value={user.name}

              onChange={handleChange}

              placeholder="Enter your name"

              required

            />


          </div>




          <div className="mb-3">


            <label>
              Email
            </label>


            <input

              type="email"

              className="form-control"

              name="email"

              value={user.email}

              onChange={handleChange}

              placeholder="Enter your email"

              required

            />


          </div>





          <div className="mb-3">


            <label>
              Password
            </label>


            <div className="password-box">


              <input

                type={
                  showPassword
                  ? "text"
                  : "password"
                }

                className="form-control"

                name="password"

                value={user.password}

                onChange={handleChange}

                placeholder="Create password"

                required

              />



              <button

                type="button"

                className="show-btn"

                onClick={() =>
                  setShowPassword(!showPassword)
                }

              >

                {
                  showPassword
                  ? "Hide"
                  : "Show"
                }


              </button>


            </div>


          </div>




          <button

            type="submit"

            className="register-submit"

          >

            Register

          </button>



        </form>



      </div>


    </div>

  );

}


export default Register;