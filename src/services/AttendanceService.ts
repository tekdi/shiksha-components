import { post } from './RestClient';
import { AttendanceParams, BulkAttendanceParams } from '../utils/Interfaces';

export const markAttendance = async ({
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

export const bulkAttendance = async ({
  attendanceDate,
  contextId,
  userAttendance
}: BulkAttendanceParams): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/attendance/bulkAttendance`;
  try {
    const response = await post(apiUrl, {  attendanceDate, contextId, userAttendance });
    return response?.data;
  } catch (error) {
    console.error('error in marking bulk attendance', error);
    throw error;
  }
};