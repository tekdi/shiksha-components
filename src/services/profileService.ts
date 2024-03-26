import { get, patch } from './RestClient';

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
export const getUserId = async (): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/auth/getUserDetails`;
  try {
    const response = await get(apiUrl);
    return response?.data?.result;
  } catch (error) {
    console.error('error in fetching user details', error);
    throw error;
  }
};

export const editEditUser = async (userId: string, userDetails: object): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/user/${userId}`;
  try {
    const response = await patch(apiUrl, userDetails);
    return response?.data;
  } catch (error) {
    console.error('error in fetching user details', error);
    throw error;
  }
};
