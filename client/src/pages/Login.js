import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {

  const navigate = useNavigate();


  const [user, setUser] = useState({

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
        "/api/users/login",
        user
      );



      alert(response.data.message);



      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );





      if (response.data.user.role === "admin") {

        navigate("/admin");

      }

      else {

        navigate("/dashboard");

      }



    }


    catch(error) {


      alert(

        error.response?.data?.message ||
        "Login Failed"

      );


    }


  }





  return (

    <div className="login-page">


      <div className="login-card">


        <h1>
          🎓
        </h1>


        <h2>
          Welcome Back
        </h2>


        <p className="text-muted">
          Login to your Club Recruitment account
        </p>




        <form onSubmit={handleSubmit}>


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

                placeholder="Enter your password"

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

            className="login-btn"

            type="submit"

          >

            Login

          </button>




        </form>



      </div>



    </div>

  );

}


export default Login;