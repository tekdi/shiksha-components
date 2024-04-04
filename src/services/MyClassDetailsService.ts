import { cohortDetailsList } from '../utils/Interfaces';
import { post } from './RestClient';

// get class details or cohort details of all student
export const getMyClassDetails = async ({
  contextId,
  report,
  limit,
  offset,
  filters
}: cohortDetailsList): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/attendance/report`;
  try {
    const response = await post(apiUrl, { contextId, report, limit, offset, filters });
    return response?.data;
  } catch (error) {
    console.error('error in attendance report api ', error);
    throw error;
  }
};

export const getMyCohortMemberList = async ({
  contextId,
  attendanceDate,
  report,
  limit,
  offset
}: cohortDetailsList): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/attendance/report`;
  try {
    const response = await post(apiUrl, { contextId, attendanceDate, report, limit, offset }); //contextId, report, limit, offset, filters
    console.log('data', response?.data);
    return response?.data;
  } catch (error) {
    console.error('error in attendance report api ', error);
    throw error;
  }
};
