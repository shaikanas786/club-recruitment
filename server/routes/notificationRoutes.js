const express = require("express");

const router = express.Router();

const Notification = require("../models/Notification");



console.log("Notification Routes Loaded");



// GET Notifications

router.get("/:email", async(req,res)=>{


    try{


        console.log(
            "Fetching notifications for:",
            req.params.email
        );



        const notifications = await Notification.find({

            studentEmail:req.params.email

        });



        res.json(notifications);



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server Error"

        });


    }


});





// Mark as read

router.put("/:id", async(req,res)=>{


    try{


        const notification = await Notification.findByIdAndUpdate(

            req.params.id,

            {
                read:true
            },

            {
                new:true
            }

        );


        res.json(notification);



    }
    catch(error){


        res.status(500).json({

            message:"Server Error"

        });


    }


});





// Delete notification

router.delete("/:id", async(req,res)=>{


    try{


        await Notification.findByIdAndDelete(

            req.params.id

        );


        res.json({

            message:"Notification Deleted"

        });



    }
    catch(error){


        res.status(500).json({

            message:"Server Error"

        });


    }


});





module.exports = router;