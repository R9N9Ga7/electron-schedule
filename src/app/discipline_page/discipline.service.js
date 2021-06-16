import { API_URL } from '../../consts';
import authHeader from '../shared/utils/auth_header';
import { getSemester } from '../shared/utils/semester.util';

export async function getDisciplines() {
  try {
    const response = await fetch(`${API_URL}/discipline/all/`, {
      headers: authHeader,
    });
    const json = await response.json();
    console.log('getDisciplines: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getDiscipline(body) {
  try {
    body.semester_id = getSemester().ID;
    console.log('getDiscipline: ', body);
    const response = await fetch(`${API_URL}/discipline/single/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDiscipline: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getDisciplineHours(discipline_id, group_id) {
  try {
    const body = {};
    body.semester_id = getSemester().ID;
    body.discipline_id = discipline_id;
    body.group_id = group_id;
    console.log('getDiscipline: ', body);
    const response = await fetch(`${API_URL}/discipline/single/hours/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDiscipline: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getFaculties() {
  try {
    const response = await fetch(`${API_URL}/faculty/all/`, {
      headers: authHeader,
    });
    const json = await response.json();
    console.log('getFaculties: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDepartment(body) {
  try {
    console.log('updateDepartment: ', body);
    const response = await fetch(`${API_URL}/department/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    // const json = await response.json();
    console.log('updateDepartment: ', response);
    // return json;
  } catch (error) {
    console.log(error);
  }
}
