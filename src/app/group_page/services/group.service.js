import { API_URL } from '../../../consts';
import authHeader from '../../shared/utils/auth_header';
import { getSemester } from '../../shared/utils/semester.util';

export async function getGroups() {
  try {
    const response = await fetch(`${API_URL}/group/all/`, {
      headers: authHeader,
      method: 'POST',
      body: JSON.stringify({ all : 1 }),
    });

    const json = await response.json();
    console.log('getGroups response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getGroup(id) {
  try {
    const response = await fetch(`${API_URL}/group/single/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ group_id: id, semester_id: getSemester().ID }),
    });

    const json = await response.json();
    console.log('getGroup response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function postGroupUpdate(body) {
  try {
    console.log('postGroupUpdate request: ', body);
    const response = await fetch(`${API_URL}/group/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    console.log('postGroupUpdate response: ', response);
  } catch (error) {
    console.error(error);
  }
}

export async function getCourse() {
  try {
    const response = await fetch(`${API_URL}/filter`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        'target': 'course',
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getColors(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'color';

    console.log('getColors request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
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
