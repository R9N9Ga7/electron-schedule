import { API_URL } from '../../consts';
import authHeader from '../shared/utils/auth_header';

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
