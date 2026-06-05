const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();

  res.json(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  res.json(customer);
});

module.exports = router;