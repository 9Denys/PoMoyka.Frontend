import { apiRequest } from "./httpClient";
import { tokenService } from "../core/tokenService";

const API_BASE_URL = "https://pomoyka-backend.onrender.com";

export function getTopCenters({ from, to }) {
  const query = `?from=${from}&to=${to}`;
  return apiRequest(`/api/Statistics/GetTopCenters/top-centers${query}`, {
    method: "GET",
  });
}

export async function downloadTopCentersPdf({ from, to }) {
  const query = `?from=${from}&to=${to}`;
  const url = `${API_BASE_URL}/api/Statistics/GetTopCentersPdf/top-centers/pdf${query}`;

  const headers = {};
  const token = tokenService.getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to download PDF (status ${response.status})`);
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `top-centers-${from}-to-${to}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
}
