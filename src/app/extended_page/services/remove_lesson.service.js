import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export default async (lesson_id, groups_id) => {
  try {
    const body = {
      semester_id: getSemester().ID,
      lesson_id,
      groups_id,
    };
    console.log('postRemoveLesson: ', body);
    await fetch(`${API_URL}/stream/lesson/delete/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}
