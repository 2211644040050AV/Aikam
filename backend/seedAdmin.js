require("dotenv").config(); 

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne();
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("super315admin@", 10);

  const admin = new User({
    name: "Super Admin",
    email: "super.admin315@gmail.com",
    password: "admin.super@315",
    role: "admin"
  });

  await admin.save();
  console.log("Admin user created!");
  process.exit();
};

seedAdmin();

// {
//     "name": "Owner User",
//     "email": "aayushvishwakarma13@gmaol.com",
//     "password": "Owner@admin315",
//     "role": ""
// }