const express = require("express");
const router = express.Router();

const Club = require("../models/Club");

const multer = require("multer");
const path = require("path");

// =============================
// Image Upload Setup
// =============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// =============================
// Get All Clubs
// =============================

router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =============================
// Get Single Club
// =============================

router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        message: "Club Not Found",
      });
    }

    res.json(club);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =============================
// Add Club With Image
// =============================

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newClub = new Club({
      clubName: req.body.clubName,
      description: req.body.description,
      faculty: req.body.faculty,
      recruitmentOpen: req.body.recruitmentOpen === "true",
      image: req.file ? req.file.filename : "",
    });

    await newClub.save();

    res.status(201).json({
      message: "Club Added Successfully",
      club: newClub,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =============================
// Update Club
// =============================

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      clubName: req.body.clubName,
      description: req.body.description,
      faculty: req.body.faculty,
      recruitmentOpen: req.body.recruitmentOpen === "true",
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedClub) {
      return res.status(404).json({
        message: "Club Not Found",
      });
    }

    res.json({
      message: "Club Updated Successfully",
      club: updatedClub,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =============================
// Delete Club
// =============================

router.delete("/:id", async (req, res) => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);

    if (!deletedClub) {
      return res.status(404).json({
        message: "Club Not Found",
      });
    }

    res.json({
      message: "Club Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;