import { API_URL } from '../../consts';
import authHeader from '../shared/utils/auth_header';
import { getSemester } from '../shared/utils/semester.util';

export async function getFaculties() {
  try {
    const response = await fetch(`${API_URL}/faculty/all/`);
    const json = await response.json();
    console.log('getFaculties: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getFaculty(faculty_id) {
  try {
    const body = {
      faculty_id,
      semester_id: getSemester().ID,
    }
    console.log('getFaculty: ', body);
    const response = await fetch(`${API_URL}/faculty/single/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getFaculty: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function updateFaculty(faculty_id, name) {
  try {
    const body = {
      faculty_id,
      name,
    }
    console.log('updateFaculty: ', body);
    const response = await fetch(`${API_URL}/faculty/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    // const json = await response.json();
    console.log('updateFaculty: ', response);
    // return json;
  } catch (error) {
    console.log(error);
  }
}

export async function postFaculty() {
  try {
    const response = await fetch(`${API_URL}/faculty/create/`, {
      method: 'POST',
      headers: authHeader,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFaculty(faculty_id) {
  try {
    const response = await fetch(`${API_URL}/faculty/delete/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ faculty_id }),
    });
    // const json = await response.json();
    // return json;
  } catch (error) {
    console.log(error);
  }
}
