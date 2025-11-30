const API_BASE_URL = "https://pomoyka-backend.onrender.com";

// Вспомогательная функция для обработки ответов
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // Проверяем, есть ли тело ответа
  const contentLength = response.headers.get('content-length');
  if (contentLength === '0' || response.status === 204) {
    return null;
  }

  return await response.json();
}

// Получить все центры для выпадающего списка
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

// Получить всех сотрудников
export async function getAllEmployees() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/Employee/GetAllEmpoyees`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

// Получить сотрудника по ID
export async function getEmployeeById(id) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/Employee/GetEmployeeById/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return handleResponse(response);
}

// Создать сотрудника
export async function createEmployee(employeeData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/Employee/CreateEmployee`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employeeData)
  });

  return handleResponse(response);
}

// Обновить сотрудника
export async function updateEmployee(id, employeeData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/Employee/UpdateEmployee/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employeeData)
  });

  return handleResponse(response);
}

// Удалить сотрудника
export async function deleteEmployee(id) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/Employee/DeleteEmployee/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return handleResponse(response);
}