import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export async function getColors(lesson_id) {
  try {
    const response = await fetch(`${API_URL}/lesson/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        semester_id: getSemester().ID,
        target: 'color',
        lesson_id,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getDays(lesson_id) {
  console.log('************', lesson_id);
  try {
    const response = await fetch(`${API_URL}/lesson/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        semester_id: getSemester().ID,
        target: 'day',
        lesson_id,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getTimes(lesson_id) {
  try {
    const response = await fetch(`${API_URL}/lesson/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        semester_id: getSemester().ID,
        target: 'time',
        lesson_id,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
