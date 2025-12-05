const API_BASE_URL = "https://pomoyka-backend.onrender.com";

// Вспомогательная функция для обработки ответов
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const contentLength = response.headers.get('content-length');
  if (contentLength === '0' || response.status === 204) {
    return null;
  }

  return await response.json();
}

// Получить все центры
export async function getAllCenters() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/Centers/GetAll`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

// Получить центр по ID с полной информацией (включая услуги)
export async function getCenterById(id) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/Centers/GetById/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

// Получить все услуги
export async function getAllServices() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/Service/GetAll`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

// Получить типы автомобилей для услуги
export async function getServiceTypes(serviceId) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/TypeService/GetById/${serviceId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

// Создать тип автомобиля для услуги
export async function createServiceType(serviceTypeData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/TypeService/Create`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceTypeData)
  });

  return handleResponse(response);
}

// Обновить тип автомобиля для услуги
export async function updateServiceType(id, serviceTypeData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/TypeService/Update/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceTypeData)
  });

  return handleResponse(response);
}

// Обновить цену услуги в центре
export async function updateCenterServicePrice(id, priceData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/api/CentersServices/Update/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(priceData)
  });

  return handleResponse(response);
}