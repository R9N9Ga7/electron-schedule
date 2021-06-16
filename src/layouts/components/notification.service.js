import { API_URL } from '../../consts';
import { getSemester } from '../../app/shared/utils/semester.util';
import authHeader from '../../app/shared/utils/auth_header';

export async function getScheduleCheck(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;

    console.log('getScheduleCheck request: ', body);

    const response = await fetch(`${API_URL}/schedule/check/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getScheduleCheck response: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}
