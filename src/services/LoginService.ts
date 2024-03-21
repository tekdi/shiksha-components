import { post } from './RestClient';

interface LoginParams {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParams): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/auth/login`;
  try {
    const response = await post(apiUrl, { username, password });
    return response?.data;
  } catch (error) {
    console.error('error in login', error);
    throw error;
  }
};
