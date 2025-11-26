
import { apiRequest } from "./httpClient";

export function createStatement({ topic, message }) {
  return apiRequest("/api/Statement/CreateStatement", {
    method: "POST",
    body: {
      topic,
      message,
    },
  });
}

export function getAllStatements() {
  return apiRequest("/api/Statement/GetAllStatements", {
    method: "GET",
  });
}

export function getStatementById(id) {
  return apiRequest(`/api/Statement/GetStatementById/${id}`, {
    method: "GET",
  });
}
