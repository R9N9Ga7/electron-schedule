import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

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

export async function getTimes(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'time';

    console.log('getTimes request: ', body);

    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log('getTimes response: ', json);
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

export async function getAudits(payload) {
  try {
    const body = payload;
    body.semester_id = getSemester().ID;
    body.target = 'auditory';

    console.log('getAudits request: ', body);

    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log('getAudits response: ', json);
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

export async function postAddSchedule(payload) {
  try {
    payload.target = 'insert';
    payload.semester_id = getSemester().ID;

    const body = payload;

    console.log('postAddSchedule request: ', body);

    const response = await fetch(`${API_URL}/stream/option/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log('postAddSchedule response: ', response);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function postAddLesson(payload) {
  try {
    payload.target = 'insert';
    payload.semester_id = getSemester().ID;

    const body = payload;

    console.log('postAddLesson request: ', body);

    const response = await fetch(`${API_URL}/stream/lesson/add/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log('postAddLesson response: ', response);
    return json;
  } catch (error) {
    console.error(error);
  }
}
