import { API_URL } from '../../../consts';

export async function postAuth(body) {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (respons.ok)
      return await response.json();
    else
      return await response.status;
  } catch (error) {
    console.log(error);
  }
}

