import { apiRequest } from "./httpClient";

export function getCenters() {
  return apiRequest("/api/Centers/GetAll", {
    method: "GET",
  });
}

export function getCenterPriceList(centerId) {
  return apiRequest(`/api/CentersServices/GetPriceList/${centerId}`, {
    method: "GET",
  });
}

export function getCenterServices(centerId) {
  return apiRequest(`/api/CentersServices/GetAll/${centerId}`, {
    method: "GET",
  });
}

export function getAllServices() {
  return apiRequest("/api/Service/GetAll", {
    method: "GET",
  });
}

export function getAllTypeServices() {
  return apiRequest("/api/TypeService/GetAll", {
    method: "GET",
  });
}

export function createTypeService(body) {
  return apiRequest(`/api/TypeService/Create`, {
    method: "POST",
    body,
  });
}

export function createCenterService(body) {
  return apiRequest(`/api/CentersServices/Create`, {
    method: "POST",
    body,
  });
}

export function updateCenterServicePrice(centerServiceId, price) {
  return apiRequest(`/api/CentersServices/Update/${centerServiceId}`, {
    method: "PUT",
    body: { price },
  });
}
