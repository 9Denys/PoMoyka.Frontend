const API_BASE_URL = 'https://pomoyka-backend.onrender.com';

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/Auth/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.detail ||
      'Invalid email or password';

    throw new Error(message);
  }

  return data;
}
