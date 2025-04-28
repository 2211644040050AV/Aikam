const express = require("express");
const Contactus = require("../models/Contactus");
// const { protect } = require("../middleware/authMiddleware"); // Not needed if public

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            name,
            contactNo,
            pinCode,
        } = req.body; // <-- Correct here

        if (!name || !contactNo || !pinCode) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const contactus = new Contactus({  // <-- Correct model name
            name,
            contactNo,
            pinCode,
        });

        const createContactUs = await contactus.save();
        res.status(201).json(createContactUs);

    } catch (error) {
        console.error("Error in contact request: ", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
