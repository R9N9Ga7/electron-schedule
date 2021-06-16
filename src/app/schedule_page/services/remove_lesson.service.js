import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export default async (lesson_id) => {
  try {
    const response = await fetch(`${API_URL}/lesson/delete/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        semester_id: getSemester().ID,
        lesson_id,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
