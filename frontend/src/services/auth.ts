export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}

export async function register({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}
