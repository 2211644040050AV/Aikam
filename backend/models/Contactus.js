const mongoose = require("mongoose");

const contactusSchema = new mongoose.Schema({
    name: {type: String, require: true},
    contactNo: {type: Number, min: 12, require: true},
    pinCode: {type: Number, min: 8, require: true},
}, {timestamps: true});

module.exports = mongoose.model("Contactus", contactusSchema);