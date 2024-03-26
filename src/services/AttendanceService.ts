import { post } from './RestClient';
import { AttendanceParams } from '../utils/Interfaces';

export const attendance = async ({
  userId,
  attendanceDate,
  attendance,
  contextId
}: AttendanceParams): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/attendance`;
  try {
    const response = await post(apiUrl, { userId, attendanceDate, attendance, contextId });
    return response?.data;
  } catch (error) {
    console.error('error in marking attendance', error);
    throw error;
  }
};
