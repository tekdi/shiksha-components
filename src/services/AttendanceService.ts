import { post } from './RestClient';
import {
  AttendanceParams,
  BulkAttendanceParams,
  AttendanceByDateParams,
  AttendanceReports
} from '../utils/Interfaces';

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
    const response = await post(apiUrl, { attendanceDate, contextId, userAttendance });
    return response?.data;
  } catch (error) {
    console.error('error in marking bulk attendance', error);
  }
};

export const getAttendanceByDate = async ({
  filters: { userId },
  fromDate,
  toDate
}: AttendanceByDateParams): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/attendance/bydate`;
  try {
    const response = await post(apiUrl, {
      fromDate,
      toDate,
      filters: { userId }
    });
    return response?.data;
  } catch (error) {
    console.error('error in marking attendance', error);
    throw error;
  }
};

export const getAttendanceReport = async ({
  contextId,
  report,
  limit,
  filters
}: AttendanceReports): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/attendance/report`;
  try {
    const response = await post(apiUrl, { contextId, report, limit, filters });
    console.log('data', response?.data);
    return response?.data;
  }catch(e){
    console.log(e)
  }
}