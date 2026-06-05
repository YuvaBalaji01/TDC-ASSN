const BASE_URL = "http://localhost:5000";

export async function getCustomers() {
  const response = await fetch(`${BASE_URL}/customers`);

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function getCustomer(id) {
  const response = await fetch(
    `${BASE_URL}/customers/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

export async function getMatches(id) {
  const response = await fetch(
    `${BASE_URL}/matches/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  return response.json();
}

export async function login(credentials) {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function generateEmail(
  customerId,
  matchId,
  score,
  explanation
) {
  const response = await fetch(
    `${BASE_URL}/generate-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        matchId,
        score,
        explanation,
      }),
    }
  );

  return response.json();
}

