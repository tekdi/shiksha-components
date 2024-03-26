import { cohortListParam } from '../utils/Interfaces';
import { post } from './RestClient';

export const cohortList = async ({
    limit,
    page,
    filters
}: cohortListParam): Promise<any> => {
  const apiUrl: string = `${import.meta.env.VITE_BASE_URL}/cohort/search`;
  try {
    const response = await post(apiUrl, { limit, page, filters });
    return response?.data;
  } catch (error) {
    console.error('error in marking attendance', error);
    throw error;
  }
};
