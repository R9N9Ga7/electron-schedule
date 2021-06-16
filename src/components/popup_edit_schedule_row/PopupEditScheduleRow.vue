<template>
  <div class="popup-edit-schedult-row position-fixed w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="form-editing bg-white p-2 rounded">
      <div class="form-editing__header d-flex align-items-center justify-content-between">
        <h2 class="fs-4 m-0">Редактировать элемент</h2>
        <button @click="onClose" class="btn-close"></button>
      </div>
      <hr>
      <div class="form-editing__controls">
        <span>Выберите цвет недели:</span>
        <div class="form-check">
          <input
            v-model="whiteWeek"
            class="form-check-input"
            type="checkbox"
            id="whiteWeekSelect"
          >
          <label
            class="form-check-label"
            for="whiteWeekSelect"
          >Белая неделя</label>
        </div>
        <div class="form-check">
          <input
            v-model="greenWeek"
            class="form-check-input"
            type="checkbox"
            id="greenWeekSelect"
          >
          <label
            class="form-check-label"
            for="greenWeekSelect"
          >Зеленая неделя</label>
        </div>
      </div>
      <hr>
      <div class="form-editing__body mt-3">
        <transition
          name="accordion-item"
          @enter="startTransition"
          @after-enter="endTransition"
          @before-leave="startTransition"
          @after-leave="endTransition">
        >
          <div class="overflow-hidden" v-if="whiteWeek">
            <span>Редактировать белую неделю</span>
            <v-select
              placeholder="Предмет"
              :options="['Теория вероятностей, математическая статистика, случайные процессы', 'Основы проектирования и компьютерные технологии', '...']"
              :clearable="false"
              class="mt-2"
              :value="whiteWeekLessonSchedule.couple_name"
              @input="setWhiteWeekCoupleName"
            />
            <v-select
              placeholder="Преподаватель"
              :options="['Иванов', 'Борисова', '...']"
              :clearable="false"
              class="mt-2"
              :value="whiteWeekLessonSchedule.lecturer"
              @input="setWhiteWeekLecturer"
            />
            <v-select
              placeholder="Аудитория"
              :options="['9-402 лек.', '331 лаб.', '...']"
              :clearable="false"
              class="mt-2"
              :value="whiteWeekLessonSchedule.audience"
              @input="setWhiteWeekAudience"
            />
          </div>
        </transition>
        <transition
          name="accordion-item"
          @enter="startTransition"
          @after-enter="endTransition"
          @before-leave="startTransition"
          @after-leave="endTransition">
        >
          <div class="overflow-hidden" v-if="greenWeek">
            <span>Редактировать белую неделю</span>
            <v-select
              placeholder="Предмет"
              :options="['Теория вероятностей, математическая статистика, случайные процессы', 'Основы проектирования и компьютерные технологии', '...']"
              :clearable="false"
              class="mt-2"
              :value="greenWeekLessonSchedule.couple_name"
              @input="setGreenWeekCoupleName"
            />
            <v-select
              placeholder="Преподаватель"
              :options="['Иванов', 'Борисова', '...']"
              :clearable="false"
              class="mt-2"
              :value="greenWeekLessonSchedule.lecturer"
              @input="setGreenWeekLecturer"
            />
            <v-select
              placeholder="Аудитория"
              :options="['9-402 лек.', '331 лаб.', '...']"
              :clearable="false"
              class="mt-2"
              :value="greenWeekLessonSchedule.audience"
              @input="setGreenWeekAudience"
            />
          </div>
        </transition>
      </div>
      <div class="mt-2">
        <button @click="onSave" class="btn btn-primary">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import { times } from '../../consts.js';

export default {
  name: 'PopupEditScheduleRow',
  data() {
    return {
      whiteWeek: false,
      greenWeek: false,
      copyScheduleOnLocal: null,
      whiteWeekLessonSchedule: {},
      greenWeekLessonSchedule: {},
      lessonsScheduleTime: '',
    };
  },
  computed: {
    ...mapState({
      schedule: (state) => state.schedule.schedule,
    }),
  },
  methods: {
    ...mapMutations({
      setSchedule: 'schedule/setSchedule',
    }),
    onClose() {
      this.$router.push({ name: 'schedule' })
    },
    copySchedule() {
      this.copyScheduleOnLocal = JSON.parse(JSON.stringify(this.schedule));
    },
    findGroupOnId() {
      const group = this.copyScheduleOnLocal.find((el) => el.id == this.$route.query.id);
      if (typeof group !== 'undefined') {
        this.findScheduleDay(group.schedule_week);
      }
    },
    findScheduleDay(week) {
      const day = week.find((el) => el.day === this.$route.query.day);
      if (typeof day !== 'undefined') {
        this.findScheduleLesson(day.schedule_day);
      }
    },
    findScheduleLesson(day) {
      const lessons = day.find((el) => el.time === times[this.$route.query.time]);
      if (typeof lessons !== 'undefined') {
        this.setValueScheduleLessons(lessons)
      }
    },
    setValueScheduleLessons(lessons) {
      this.whiteWeekLessonSchedule = lessons.white_week;
      this.greenWeekLessonSchedule = lessons.green_week;
      console.log(this.whiteWeekLessonSchedule);
    },
    onSave() {
      this.setSchedule(this.copyScheduleOnLocal);
      this.onClose();
    },
    setWhiteWeekCoupleName(value) {
      this.whiteWeekLessonSchedule.couple_name = value;
    },
    setWhiteWeekLecturer(value) {
      this.whiteWeekLessonSchedule.lecturer = value;
    },
    setWhiteWeekAudience(value) {
      this.whiteWeekLessonSchedule.audience = value;
    },
    setGreenWeekCoupleName(value) {
      this.greenWeekLessonSchedule.couple_name = value;
    },
    setGreenWeekLecturer(value) {
      this.greenWeekLessonSchedule.lecturer = value;
    },
    setGreenWeekAudience(value) {
      this.greenWeekLessonSchedule.audience = value;
    },
    startTransition(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    endTransition(el) {
      el.style.height = '';
    },
  },
  created() {
    this.copySchedule();
    this.findGroupOnId();
  },
};
</script>

<style lang="scss" scoped>
.popup-edit-schedult-row {
  background-color: rgba(33, 33, 33, .6);
  top: 0;
  left: 0;
  z-index: 10;
  .form-editing {
    width: 800px;
  }
}

.accordion-item-enter-active, .accordion-item-leave-active {
  will-change: height;
  transition: height 0.2s ease;
}
.accordion-item-enter, .accordion-item-leave-to {
  height: 0 !important;
}

</style>
