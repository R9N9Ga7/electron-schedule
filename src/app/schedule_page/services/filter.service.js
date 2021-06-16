import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export async function getFilter(filter) {
  try {
    filter.semester_id = getSemester().ID;
    const response = await fetch(`${API_URL}/filter`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(filter),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
