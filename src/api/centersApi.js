const API_BASE_URL = 'https://pomoyka-backend.onrender.com';

export async function getAllCenters() {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch(`${API_BASE_URL}/api/Centers/GetAll`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch centers: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getCenterById(id) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Centers/GetById/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch center');
  }

  return await response.json();
}

export async function createCenter(centerData) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Centers/Create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(centerData),
  });

  if (!response.ok) {
    throw new Error('Failed to create center');
  }

  // Если ответ пустой, не пытаемся парсить JSON
  const contentLength = response.headers.get('content-length');
  if (contentLength === '0' || response.status === 204) {
    return null;
  }

  return await response.json();
}

export async function updateCenter(id, centerData) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Centers/Update/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(centerData),
  });

  if (!response.ok) {
    throw new Error('Failed to update center');
  }

  // Если ответ пустой, не пытаемся парсить JSON
  const contentLength = response.headers.get('content-length');
  if (contentLength === '0' || response.status === 204) {
    return null;
  }

  return await response.json();
}

export async function deleteCenter(id) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Centers/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete center');
  }

  // Если ответ пустой, не пытаемся парсить JSON
  const contentLength = response.headers.get('content-length');
  if (contentLength === '0' || response.status === 204) {
    return null;
  }

  return await response.json();
}