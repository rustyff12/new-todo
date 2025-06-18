export async function fetchTodos(token: string) {
  const url = "http://localhost:8000/api/todos/";

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await res.json();
  return data;
}
