require("dotenv").config();

const mongoose = require("mongoose");
const Customer = require("./models/Customer");

mongoose.connect(process.env.MONGO_URI);

const profiles = require("./data/profiles.json");

async function seed() {
  await Customer.deleteMany();

  await Customer.insertMany(profiles);

  const User = require("./models/User");

  await User.create({
    username: "admin",
    password: "admin123",
  });

  console.log("100 Data Inserted");

  process.exit();
}

seed();