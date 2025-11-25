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
