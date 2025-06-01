const express = require("express");
const Contactus = require("../models/Contactus");

const router = express.Router();

// @route   POST /api/contactUs
// @desc    Submit contact form
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, contactNo, pinCode } = req.body;

    // Simple validation
    if (!name || !contactNo || !pinCode) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Create new contact submission
    const contact = new Contactus({ name, contactNo, pinCode });
    const createdContact = await contact.save();

    res.status(201).json(createdContact);
  } catch (error) {
    console.error("Error in contact request:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
