import { API_URL } from '../../../consts';
import authHeader from '../../shared/utils/auth_header';

export async function getFilter(filter) {
  try {
    const response = await fetch(`${API_URL}/filter`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify(filter),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
