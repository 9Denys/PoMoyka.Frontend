const API_BASE_URL = 'https://pomoyka-backend.onrender.com';

export async function getAllServices() {
  const accessToken = localStorage.getItem('accessToken');
  console.log('Token:', accessToken); // Отладка
  
  const response = await fetch(`${API_BASE_URL}/api/Service/GetAll`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('Response status:', response.status); // Отладка
  
  if (!response.ok) {
    throw new Error(`Failed to fetch services: ${response.status}`);
  }

  const data = await response.json();
  console.log('Services data:', data); // Отладка
  return data;
}

export async function createService(serviceData) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Service/Create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error('Failed to create service');
  }

  return await response.json();
}

export async function updateService(id, serviceData) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Service/Update/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error('Failed to update service');
  }

  return await response.json();
}

export async function deleteService(id) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Service/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete service');
  }

  return response;
}