import { API_URL } from '../../../consts';
import authHeader from '../../shared/utils/auth_header';

export default async () => {
  try {
    const response = await fetch(`${API_URL}/stream/groups/`, {
      headers: authHeader,
      method: 'POST',
      body: JSON.stringify({ all: 1 }),
    });
    const json = await response.json();

    console.log('getGroups response: ', json);

    return json;
  } catch (error) {
    console.error(error);
  }
};
