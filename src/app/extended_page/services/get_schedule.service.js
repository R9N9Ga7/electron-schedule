import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export default async (payload) => {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;

    console.log('getSchedule request: ', body);

    const response = await fetch(`${API_URL}/stream/schedule/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();

    console.log('getSchedule response: ', json);

    return json;
  } catch (error) {
    console.error(error);
  }
};
