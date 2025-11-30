import { tokenService } from "../core/tokenService";

const API_BASE_URL = "https://pomoyka-backend.onrender.com";

export async function apiRequest(
  path,
  { method = "GET", body, auth = true, isFormData = false } = {}
) {
  const headers = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = tokenService.getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  let raw = "";
  try {
    raw = await response.text();
  } catch {
    raw = "";
  }

  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw; 
    }
  }

  if (!response.ok) {
    console.error("API error:", response.status, data);

    if (data && typeof data === "object" && data.errors) {
      const firstKey = Object.keys(data.errors)[0];
      const firstError = data.errors[firstKey]?.[0];
      throw new Error(firstError || data.title || "Request validation error");
    }

    throw new Error(
      (data && data.message) ||
        (data && data.detail) ||
        (data && data.title) ||
        `Request error (${response.status})`
    );
  }

  return data;
}
