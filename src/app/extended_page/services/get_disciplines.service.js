import { API_URL } from '../../../consts';
import { getSemester } from '../../shared/utils/semester.util';
import authHeader from '../../shared/utils/auth_header';

export default async (groups_id) => {
  try {
    const body = {
      semester_id: getSemester().ID,
      groups_id,
    };

    console.log('getDisciplines request: ', body);

    const response = await fetch(`${API_URL}/stream/disciplines/`, {
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
};
