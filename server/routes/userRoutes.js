const express = require("express");
const router = express.Router();

const User = require("../models/User");



// ======================
// Get All Users (Admin Dashboard)
// ======================

router.get("/", async(req,res)=>{

  try{


    const users = await User.find({

      role:"student"

    });


    res.json(users);


  }
  catch(error){


    console.log(error);


    res.status(500).json({

      message:"Server Error"

    });


  }


});






// ======================
// Register User
// ======================

router.post("/register", async (req,res)=>{


  try{


    const {

      name,

      email,

      password

    } = req.body;





    const existingUser = await User.findOne({

      email

    });





    if(existingUser){


      return res.status(400).json({

        message:"User already exists"

      });


    }






    let role="student";





    if(

      email==="admin@gmail.com" &&

      password==="admin123"

    ){

      role="admin";

    }






    const newUser = new User({


      name,

      email,

      password,

      role


    });







    await newUser.save();







    res.status(201).json({


      message:"Registration Successful",


      user:newUser


    });






  }


  catch(error){


    console.log(error);


    res.status(500).json({

      message:"Server Error"

    });


  }



});









// ======================
// Login User
// ======================


router.post("/login", async(req,res)=>{


  try{


    const {

      email,

      password

    } = req.body;







    const user = await User.findOne({


      email,

      password


    });







    if(!user){


      return res.status(401).json({

        message:"Invalid Email or Password"

      });


    }








    res.json({


      message:"Login Successful",



      user:{


        _id:user._id,


        name:user.name,


        email:user.email,


        role:user.role,


        profileImage:user.profileImage


      }


    });






  }


  catch(error){


    console.log(error);


    res.status(500).json({

      message:"Server Error"

    });


  }



});









// ======================
// Update Profile
// ======================


router.put("/update/:id", async(req,res)=>{


  try{


    const {


      name,

      email,

      password,

      profileImage


    } = req.body;






    const updateData={


      name,

      email,

      profileImage


    };







    if(password && password.trim()!==""){


      updateData.password=password;


    }







    const updatedUser = await User.findByIdAndUpdate(


      req.params.id,


      updateData,


      {

        new:true

      }


    );







    if(!updatedUser){


      return res.status(404).json({

        message:"User not found"

      });


    }








    res.json({


      message:"Profile Updated",



      user:{


        _id:updatedUser._id,


        name:updatedUser.name,


        email:updatedUser.email,


        role:updatedUser.role,


        profileImage:updatedUser.profileImage


      }



    });







  }


  catch(error){


    console.log(error);


    res.status(500).json({

      message:"Update Failed"

    });


  }



});







module.exports = router;