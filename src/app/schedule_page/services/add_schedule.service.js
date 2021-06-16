import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

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

export async function getColors(group_id) {
  try {
    const body = {
      target: 'color',
      group_id,
      semester_id: getSemester().ID,
    };

    // console.log('getColors request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getColors response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDisciplines(group_id) {
  try {
    const body = {
      target: 'discipline',
      group_id,
      semester_id: getSemester().ID,
    };

    // console.log('getDisciplines request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getDisciplines response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getTimes(payload) {
  try {
    payload.target = 'time';
    payload.semester_id = getSemester().ID;

    const body = payload;

    // console.log('getTimes request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getTimes response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getTeachers(payload) {
  try {
    payload.target = 'teacher';
    payload.semester_id = getSemester().ID;

    const body = payload;

    // console.log('getTeachers request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getTeachers response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDisciplineTypes(payload) {
  try {
    payload.target = 'disciplineType';
    payload.semester_id = getSemester().ID;

    const body = payload;

    // console.log('getDisciplineTypes request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getDisciplineTypes response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getAudits(payload) {
  try {
    payload.target = 'auditory';
    payload.semester_id = getSemester().ID;

    const body = payload;

    // console.log('getAudits request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getAudits response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getStreams(payload) {
  try {
    payload.target = 'stream';
    payload.semester_id = getSemester().ID;

    const body = payload;

    // console.log('getStreams request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('getStreams response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getGroups() {
  try {
    const response = await fetch(`${API_URL}/group/all/`, {
      headers: authHeader,
    });

    const json = await response.json();
    // console.log('getGroups response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getDisciplinesAll() {
  try {
    const response = await fetch(`${API_URL}/discipline/all/`, {
      headers: authHeader,
    });
    const json = await response.json();
    // console.log('getDisciplines: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function postAddSchedule(payload) {
  try {
    payload.target = 'insert';
    payload.semester_id = getSemester().ID;

    const body = payload;

    // console.log('postAddSchedule request: ', body);

    const response = await fetch(`${API_URL}/lesson/add/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    // console.log('postAddSchedule response: ', response);
    return json;
  } catch (error) {
    console.error(error);
  }
}
