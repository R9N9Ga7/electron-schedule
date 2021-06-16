import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

// {
//   "semester_id": "5:94052826",
//   "target": "day",
//   "groups_id": ["5:88576317"],
//   "discipline_id": "1:1748538",
//   "color_id": "5:89374901",
//   "day_id": "5:89224986",
//   "time_id": "5:89226935"
// }

export async function getDisciplines(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'discipline';
    console.log('getDisciplines request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDisciplines response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getTeachers(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'teacher';
    console.log('getTeachers request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getTeachers response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuditories(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'auditory';
    console.log('getAuditories request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getAuditories response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getStreams(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'stream';
    console.log('getStreams request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getStreams response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDisciplineTypes(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'disciplineType';
    console.log('getDisciplineTypes request: ', body);
    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDisciplineTypes response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function postEditSchedule(payload) {
  try {
    payload.semester_id = getSemester().ID;
    const body = payload;
    console.log('postEditSchedule request: ', body);
    const response = await fetch(`${API_URL}/stream/add/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('postEditSchedule response: ', response);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function postEditLesson(payload) {
  try {
    payload.semester_id = getSemester().ID;
    const body = payload;
    console.log('postEditLesson request: ', body);
    const response = await fetch(`${API_URL}/stream/lesson/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    // const json = await response.json();
    console.log('postEditLesson response: ', response);
    // return json;
  } catch (error) {
    console.error(error);
  }
}
