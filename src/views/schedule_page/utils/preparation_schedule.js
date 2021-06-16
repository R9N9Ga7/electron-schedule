import { times } from '../../../consts.js';

export default class PreparationSchedule {
  preparation(schedule) {
    this.iterateOnGroup(schedule);
  }

  iterateOnGroup(schedule) {
    schedule.forEach((element, index) => {
      this.iterateOnWeek(element.schedule_week, element.id, index);
    });
  }

  iterateOnWeek(week, id, index) {
    week.forEach(element => {
      this.iterateOnDay(element.schedule_day, id, element.day, index);
    });
  }

  iterateOnDay(day, id, dayOfWeek, index) {
    day.forEach(element => {
      this.modificationFieldsOnDays(element, id, dayOfWeek, index);
    });
  }

  modificationFieldsOnDays(lesson, id, dayOfWeek, index) {
    lesson.time = times.indexOf(lesson.time);
    lesson.day = dayOfWeek;
    lesson.index = index;
    lesson.id = id;
  }
}
