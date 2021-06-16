import { API_URL } from '../../../consts.js';

export async function getSchedule() {
  try {
    const response = await fetch(`${API_URL}/schedule`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
