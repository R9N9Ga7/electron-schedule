import { API_URL } from '../../../consts';
import authHeader from '../../shared/utils/auth_header';
import { getSemester } from '../../shared/utils/semester.util';

export async function getTeachers() {
  try {
    const response = await fetch(`${API_URL}/teacher/all/`, {
      headers: authHeader,
    });

    const json = await response.json();
    console.log('getTeachers response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getTeacher(id) {
  try {
    const response = await fetch(`${API_URL}/teacher/single/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ teacher_id: id, semester_id: getSemester().ID }),
    });

    const json = await response.json();
    console.log('getTeacher response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDepartments() {
  try {
    const response = await fetch(`${API_URL}/teacher/departments/`, {
      headers: authHeader,
    });

    const json = await response.json();
    console.log('getTeacher response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function postTeacherUpdate(body) {
  try {
    console.log('postTeacherUpdate request: ', body);
    const response = await fetch(`${API_URL}/teacher/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    console.log('postTeacherUpdate response: ', response);
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
