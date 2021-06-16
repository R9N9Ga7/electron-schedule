import { API_URL } from '../../../consts';
import authHeader from '../../shared/utils/auth_header';
import { getSemester } from '../../shared/utils/semester.util';

export async function getAuditories() {
  try {
    const response = await fetch(`${API_URL}/auditory/all/`, {
      headers: authHeader,
    });

    const json = await response.json();
    console.log('getAuditories response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuditory(id) {
  try {
    const response = await fetch(`${API_URL}/auditory/single/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ auditory_id: id, semester_id: getSemester().ID }),
    });

    const json = await response.json();
    console.log('getAuditory response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuditoryType() {
  try {
    const response = await fetch(`${API_URL}/auditory/types/`, {
      headers: authHeader,
    });

    const json = await response.json();
    console.log('getAuditories response: ', json);
    return json;
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

export async function updateAuditory(id, name, places, room_type) {
  try {
    const body = {
      id,
      name,
      places,
      room_type,
    }
    const response = await fetch(`${API_URL}/auditory/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function postAuditory() {
  try {
    const response = await fetch(`${API_URL}/auditory/create/`, {
      method: 'POST',
      headers: authHeader,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAuditory(auditory_id) {
  try {
    const response = await fetch(`${API_URL}/auditory/delete/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ auditory_id }),
    });
    // const json = await response.json();
    // return json;
  } catch (error) {
    console.log(error);
  }
}
