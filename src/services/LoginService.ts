import { post } from './RestClient';

export const login = async ({ username, password }) => {
  const apiUrl = `${import.meta.env.VITE_BASE_URL}/auth/login`;
  try {
    const response = await post(apiUrl, { username, password });
    return response?.data;
  } catch (error) {
    console.error('error in login', error);
    throw error;
  }
};
