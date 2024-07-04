import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const refreshToken = async (refreshToken:string) => {
  const response = await api.post('refresh/token', { refresh: refreshToken });
  return response.data;
};

export const getUser = async (token:string) => {
  try {
    const response = await api.get('user/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};