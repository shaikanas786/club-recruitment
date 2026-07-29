const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Notification = require("../models/Notification");

console.log("Application Routes Loaded");

// =====================================
// Test Route
// =====================================

router.get("/test", (req, res) => {
  res.send("Application Route Working");
});

// =====================================
// Submit Application
// =====================================

router.post("/", async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      clubName,
      phone,
      branch,
      year,
      reason,
    } = req.body;

    if (
      !studentName ||
      !studentEmail ||
      !clubName ||
      !phone ||
      !branch ||
      !year ||
      !reason
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const existingApplication = await Application.findOne({
      studentEmail,
      clubName,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this club.",
      });
    }

    const application = new Application({
      studentName,
      studentEmail,
      clubName,
      phone,
      branch,
      year,
      reason,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// =====================================
// Get All Applications
// =====================================

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =====================================
// Get Applications By Club
// =====================================

router.get("/club/:clubName", async (req, res) => {
  try {
    const applications = await Application.find({
      clubName: req.params.clubName,
    }).sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =====================================
// Get Applications By Student
// =====================================

router.get("/student/:email", async (req, res) => {
  try {
    const applications = await Application.find({
      studentEmail: req.params.email,
    }).sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =====================================
// Get Single Application
// =====================================

router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
      });
    }

    res.json(application);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =====================================
// Update Application Status
// =====================================

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid Status",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
      });
    }

    application.status = status;

    await application.save();

    const notification = new Notification({
      studentEmail: application.studentEmail,
      message: `Your application for ${application.clubName} has been ${status}.`,
      read: false,
    });

    await notification.save();

    res.json({
      success: true,
      message: "Application Status Updated Successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =====================================
// Delete Application
// =====================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Application Not Found",
      });
    }

    res.json({
      success: true,
      message: "Application Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;