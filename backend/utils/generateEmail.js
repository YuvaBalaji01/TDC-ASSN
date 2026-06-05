function generateEmail(
  customer,
  match,
  score,
  explanation
) {
  let level = "Potential Match";

  if (score >= 90) {
    level = "High Potential Match";
  } else if (score >= 70) {
    level = "Strong Match";
  }

  return `
Hi ${customer.firstName},

We are excited to introduce a ${level} for you from The Date Crew.

Based on our matchmaking analysis, we found a promising profile that aligns well with your preferences and long-term goals.

Match Details

Name: ${match.firstName} ${match.lastName}
Age: ${match.age}
City: ${match.city}
Education: ${match.degree}
Company: ${match.company}
Income: ${match.income}

Compatibility Score: ${score}%

Why this match?

${explanation}

We encourage you to review this profile and consider taking the next step in your matchmaking journey.

Best Regards,
The Date Crew
`;
}

module.exports = generateEmail;