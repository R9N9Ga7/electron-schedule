import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export async function getColors(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'color';
    console.log('getColors request: ', body);

    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getColors response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDays(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'day';
    console.log('getDays request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDays response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getTimes(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'time';
    console.log('getDays request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDays response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}
