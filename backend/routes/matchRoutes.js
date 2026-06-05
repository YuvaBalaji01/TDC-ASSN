const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const oppositeGender =
      customer.gender === "Male"
        ? "Female"
        : "Male";

    const candidates = await Customer.find({
      gender: oppositeGender,
    });

    const scoredMatches = candidates.map((candidate) => {
      let score = 0;

      // Male preferences
      if (customer.gender === "Male") {
        if ((candidate.age || 0) < (customer.age || 0))
          score += 25;

        if (
          Number.parseInt(candidate.income) <
          Number.parseInt(customer.income)
        )
          score += 25;

        if (
          candidate.wantKids === customer.wantKids
        )
          score += 25;

        score += 25;
      }

      // Female preferences
      else {
        if (candidate.degree === customer.degree)
          score += 20;

        if (
          candidate.wantKids === customer.wantKids
        )
          score += 20;

        if (
          candidate.openToRelocate ===
          customer.openToRelocate
        )
          score += 20;

        if (candidate.city === customer.city)
          score += 20;

        if (
          candidate.religion ===
          customer.religion
        )
          score += 20;
      }

      const reasons = [];

      if (candidate.city === customer.city) {
        reasons.push("same city");
      }

      if (
        candidate.religion === customer.religion
      ) {
        reasons.push(
          "shared religious background"
        );
      }

      if (
        candidate.wantKids === customer.wantKids
      ) {
        reasons.push("similar family goals");
      }

      if (
        candidate.openToRelocate ===
        customer.openToRelocate
      ) {
        reasons.push(
          "matching relocation preferences"
        );
      }

      const explanation =
        reasons.length > 0
          ? `Good match due to ${reasons.join(
              ", "
            )}.`
          : "Compatible profile based on overall preferences.";

      return {
        customer: candidate,
        score,
        explanation,
      };
    });

    scoredMatches.sort(
      (a, b) => b.score - a.score
    );

    const filteredMatches = scoredMatches.filter(
      (match) => match.score > 0
    );

    res.json(filteredMatches.slice(0, 30));
  } catch (error) {
    console.error("MATCH ERROR:");
    console.error(error);

    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;