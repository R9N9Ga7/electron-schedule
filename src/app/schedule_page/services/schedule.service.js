import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export async function getSchedules(group, target = 'group') {
  try {
    const body = {
      target,
      'semester_id': getSemester().ID,
      'values': group,
    };

    // console.log('getSchedules request: ', body);

    const response = await fetch(`${API_URL}/schedule`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    // console.log('getSchedules response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDays(group_id) {
  try {
    const body = {
      target: 'day',
      group_id,
      semester_id: getSemester().ID,
    };

    // console.log('getDays request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getDays response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}
