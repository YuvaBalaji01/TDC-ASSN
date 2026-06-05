const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  age: Number,
  city: String,
  country: String,
  height: String,
  maritalStatus: String,
  religion: String,
  caste: String,
  languages: [String],

  college: String,
  degree: String,

  company: String,
  designation: String,
  income: String,

  wantKids: String,
  openToRelocate: String,
  openToPets: String,
});

module.exports = mongoose.model("Customer", customerSchema);