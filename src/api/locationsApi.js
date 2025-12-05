import { apiRequest } from "./httpClient";

export function getCenters() {
  return apiRequest("/api/Centers/GetAll", {
    method: "GET",
  });
}

export function getCenterById(id) {
  return apiRequest(`/api/Centers/GetById/${id}`, {
    method: "GET",
  });
}

export function getCenterServices(centerId) {
  return apiRequest(`/api/CentersServices/GetAll/${centerId}`, {
    method: "GET",
  });
}

export function getCenterPriceList(centerId) {
  return apiRequest(`/api/CentersServices/GetPriceList/${centerId}`, {
    method: "GET",
  });
}
