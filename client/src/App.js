import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Apply from "./pages/Apply";


import Admin from "./pages/Admin";
import ManageClubs from "./pages/ManageClubs";

import ClubDetails from "./pages/ClubDetails";

import ClubApplicants from "./pages/ClubApplicants";



function App() {


  return (

    <BrowserRouter>


      <Navbar />


      <Routes>



        {/* Public Routes */}


        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/club/:id"
          element={<ClubDetails />}
        />





        {/* Student Routes */}


        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        <Route
          path="/applications"
          element={<Applications />}
        />


        <Route
          path="/profile"
          element={<Profile />}
        />


        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />


        <Route
          path="/apply"
          element={<Apply />}
        />







        {/* Admin Routes */}


        <Route
          path="/admin"
          element={<Admin />}
        />


        <Route
          path="/admin/clubs"
          element={<ManageClubs />}
        />


        <Route
          path="/admin/applicants/:clubName"
          element={<ClubApplicants />}
        />




      </Routes>


    </BrowserRouter>

  );

}



export default App;