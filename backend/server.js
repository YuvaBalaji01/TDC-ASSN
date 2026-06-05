const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const customerRoutes = require("./routes/customerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/matches", matchRoutes);
app.use("/", authRoutes);
app.use("/generate-email", emailRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

