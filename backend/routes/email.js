const express = require("express");
const Customer = require("../models/Customer");
const generateEmail = require("../utils/generateEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
   const {
        customerId,
        matchId,
        score,
        explanation,
    } = req.body;

    const customer =
      await Customer.findById(customerId);

    const match =
      await Customer.findById(matchId);

    const email = generateEmail(
        customer,
        match,
        score,
        explanation
    );

    res.json({
      success: true,
      email,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate email",
    });
  }
});

module.exports = router;