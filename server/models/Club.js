const mongoose = require("mongoose");


const clubSchema = new mongoose.Schema(

  {

    clubName: {

      type: String,

      required: true

    },


    description: {

      type: String,

      required: true

    },


    faculty: {

      type: String,

      default: ""

    },


    recruitmentOpen: {

      type: Boolean,

      default: true

    },


    image: {

      type: String,

      default: ""

    }


  },

  {

    collection: "Clubs"

  }

);



module.exports = mongoose.model(
  "Club",
  clubSchema
);