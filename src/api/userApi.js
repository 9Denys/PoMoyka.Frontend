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


export function getUserImageUrl() {
  
  return apiRequest("/api/User/GetUserImageUrl", { method: "GET" });
}

export function uploadUserImage(file) {
  const formData = new FormData();
  formData.append("image", file); 

  return apiRequest("/api/User/UploadImage", {
    method: "POST",
    body: formData,
    isFormData: true,
  });
}

export function deleteUserImage() {
  return apiRequest("/api/User/DeleteImage", {
    method: "DELETE",
  });
}
