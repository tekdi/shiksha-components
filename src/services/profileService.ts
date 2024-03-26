import { get } from './RestClient';

export const getUser = async (userId: string): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/user/${userId}`;
  try {
    const response = await get(apiUrl);
    return response?.data;
  } catch (error) {
    console.error('error in fetching user details', error);
    throw error;
  }
};
