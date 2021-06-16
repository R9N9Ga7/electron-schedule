import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export async function getDisciplines(lesson_id) {
  try {
    const body = {
      semester_id: getSemester().ID,
      target: 'discipline',
      lesson_id,
    };
    // console.log('getDisciplines request: ', body);
    const response = await fetch(`${API_URL}/lesson/option`, {
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

export async function getTeachers(lesson_id) {
  try {
    const body = {
      semester_id: getSemester().ID,
      target: 'teacher',
      lesson_id,
    };
    // console.log('getTeachers request: ', body);
    const response = await fetch(`${API_URL}/lesson/option`, {
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

export async function getAuditories(lesson_id) {
  try {
    const body = {
      semester_id: getSemester().ID,
      target: 'auditory',
      lesson_id,
    };
    console.log('getAuditories request: ', body);
    const response = await fetch(`${API_URL}/lesson/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    // console.log('getAuditories response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getStreams(lesson_id) {
  try {
    const body = {
      semester_id: getSemester().ID,
      target: 'stream',
      lesson_id,
    };
    // console.log('getStreams request: ', body);
    const response = await fetch(`${API_URL}/lesson/option`, {
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

export async function getDisciplineTypes(lesson_id) {
  try {
    const body = {
      semester_id: getSemester().ID,
      target: 'disciplineType',
      lesson_id,
    };
    // console.log('getDisciplineTypes request: ', body);
    const response = await fetch(`${API_URL}/lesson/option`, {
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

export async function postEditSchedule(payload) {
  try {
    payload.semester_id = getSemester().ID;
    const body = payload;
    // console.log('postEditSchedule request: ', body);
    const response = await fetch(`${API_URL}/lesson/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    // console.log('postEditSchedule response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function postEditLesson(payload) {
  try {
    // console.log('postEditLesson request: ', payload);
    const response = await fetch(`${API_URL}/lesson/update/`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(payload),
    });
    // const json = await response.json();
    // console.log('postEditLesson response: ', response);
    // return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getGroups(lesson_id) {
  try {
    // const response = await fetch(`${API_URL}/group/all/`, {
    const response = await fetch(`${API_URL}/lesson/option`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ target: 'group', lesson_id, semester_id: getSemester().ID, }),
    });

    const json = await response.json();
    // console.log('getGroups response: ', json);
    return json;
  } catch (error) {
    console.error(error);
  }
}
