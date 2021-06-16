import { API_URL } from '../../../consts';
import authHeader from '../utils/auth_header';

export default async () => {
  try {
    const response = await fetch(`${API_URL}/settings/semesters`, {
      headers: authHeader,
    });
    return await response.json();
  } catch (error) {
    console.error(errror);
  }
};
