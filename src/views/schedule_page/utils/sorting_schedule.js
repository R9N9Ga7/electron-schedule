import { times } from '../../../consts.js';

export default class Schedule {
  resultArr = [];
  groupsId = [];

  lessonTemplate = (id) => {
    return {
      white_week: {},
      green_week: {},
      day: '',
      id,
      lecturer: '',
      time: -1,
    }
  };

  sort(schedule) {
    this.fillResultArr();
    this.iterateOnGroup(schedule);
    this.addGroupsId(schedule);

    this.fillEmptyLessons(this.resultArr, schedule.length);

    return this.resultArr;
  }

  fillResultArr() {
    for (let i = 0; i < 6; i++) {
      this.resultArr.push([]);
      for (let j = 0; j < times.length; j++) {
        this.resultArr[i].push([]);
      }
    }
  }

  iterateOnGroup(schedule) {
    for (const group of schedule) {
      this.iterateOnWeek(group.schedule_week);
    }
  }

  iterateOnWeek(week) {
    for (const day of week) {
      this.iterateOnDay(day.schedule_day);
    }
  }

  iterateOnDay(day) {
    for (const lesson of day) {
      this.switcher(lesson);
    }
  }

  switcher(lesson) {
    switch (lesson.day) {
      case 'Понедельник':
        this.addNewItem(0, lesson);
        break;
      case 'Вторник':
        this.addNewItem(1, lesson);
        break;
      case 'Среда':
        this.addNewItem(2, lesson);
        break;
      case 'Четверг':
        this.addNewItem(3, lesson);
        break;
      case 'Пятница':
        this.addNewItem(4, lesson);
        break;
      case 'Суббота':
        this.addNewItem(5, lesson);
        break;
    }
  }

  addNewItem(dayId, lesson) {
    const arrIndex = this.resultArr[dayId][lesson.time].length - 1;
    const solve = lesson.index - arrIndex;

    if (solve !== 1) {
      for (let i = 0; i < solve - 1; i++) {
        this.resultArr[dayId][lesson.time].push(this.lessonTemplate(lesson.id));
      }
    }

    this.resultArr[dayId][lesson.time].push(lesson);
  }

  addGroupsId(schedule) {
    for (const group of schedule) {
      this.groupsId.push(group.id);
    }
  }

  fillEmptyLessons(schedule, length) {
    this.itertaeScheduleOnDay(schedule, length);
  }

  itertaeScheduleOnDay(days, length) {
    days.forEach(day => {
      this.iterateScheduleOnLesson(day, length);
    });
  }

  iterateScheduleOnLesson(lessons, length) {
    lessons.forEach(lesson => {
      this.addEmptyLessons(lesson, length);
    });
  }

  addEmptyLessons(lesson, length) {
    if (length > 0 && lesson.length) {
      for (let i = lesson.length; i < length; i++) {
        lesson.push(this.lessonTemplate(this.groupsId[i]));
      }
    } else if (length === 1 && !lesson.length) {
      lesson.push(this.lessonTemplate(this.groupsId[0]));
    }
  }
}
