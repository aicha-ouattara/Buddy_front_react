//import { API_URL } from '../../';
import { getToken } from './token';

const getHeaders = async () => {
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const post = async (destination, body) => {
  const headers = await getHeaders();

  const result = await fetch('http://10.0.0.33:8000/api/experiences', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  console.log(result);

  if (result.ok) {
    return await result.json();
  }
  throw { error: result.status };
};

export const get = async (destination) => {
  const headers = await getHeaders();

  const result = await fetch('http://10.0.0.33:8000/api/login', {
    method: 'GET',
    headers,
  });

  if (result.ok) {
    return await result.json();
  }

  throw { 
      error: result.status 
};

};