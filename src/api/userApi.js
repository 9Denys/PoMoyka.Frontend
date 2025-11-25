import { apiRequest } from "./httpClient";

export function getMyProfile() {
  return apiRequest("/api/User/GetMyProfile", { method: "GET" });
}

export function updateMyProfile(profile) {
  return apiRequest("/api/User/UpdateMyProfile", {
    method: "PUT", 
    body: profile,
  });
}
