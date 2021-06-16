import PreparationSchedule from './preparation_schedule.js';
import Schedule from './sorting_schedule.js';

export default function sortingScheduleForTable(scheduleArr) {
  const copySchedule = JSON.parse(JSON.stringify(scheduleArr));

  const preparationSchedule = new PreparationSchedule();
  const schedule = new Schedule();

  preparationSchedule.preparation(copySchedule);

  return schedule.sort(copySchedule);
}
