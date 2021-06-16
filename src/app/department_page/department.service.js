import { API_URL } from '../../consts';
import authHeader from '../shared/utils/auth_header';
import { getSemester } from '../shared/utils/semester.util';

export async function getDepartments() {
  try {
    const response = await fetch(`${API_URL}/department/all/`, {
      headers: authHeader,
    });
    const json = await response.json();
    console.log('getDepartments: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getDepartment(department_id) {
  try {
    const body = {
      department_id,
      semester_id: getSemester().ID,
    }
    console.log('getDepartment: ', body);
    const response = await fetch(`${API_URL}/department/single/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log('getDepartment: ', json);
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

export async function postDepartment() {
  try {
    const response = await fetch(`${API_URL}/department/create/`, {
      method: 'POST',
      headers: authHeader,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDepartment(department_id) {
  try {
    const response = await fetch(`${API_URL}/department/delete/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ department_id }),
    });
    // const json = await response.json();
    // return json;
  } catch (error) {
    console.log(error);
  }
}
