<template>
  <div class="schedule-table border border-dark">
    <div class="schedule-table__header d-flex position-sticky" style="top: 0;">
      <TableCell>День недели</TableCell>
      <TableRow
        v-for="group in schedule"
        :key="group.id"
      >
        <TableCell>Время</TableCell>
        <TableCell>{{ group.group }}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </div>
    <div
      v-for="(day, index) in getSortedSchedule"
      :key="`${index}-schedule-key`"
      class="schedule-table__body-week d-flex"
    >
      <div
        class="schedule-table__body-week-day position-sticky border border-dark"
        style="
          writing-mode: vertical-rl;
          transform:rotate(180deg);
          width: 90px;
          left: 0;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <span>{{ days[index] || '' }}</span>
      </div>
      <div class="schedule-table__body-week-schedule">
        <div
          v-for="(lessons, index) in day"
          :key="`key-for-day=${index}`"
          class="d-flex"
        >
          <TableRow
            v-for="(lesson, index) in lessons"
            :key="`cool-key-${index}`"
            @click.native="onClickTableRow(lesson)"
          >
            <TableCell>{{ times[lesson.time] || '' }}</TableCell>
            <TableCell>
              <template
                v-if="Object.keys(lesson.white_week).length"
                v-slot:white
              >
                <p class="m-0">{{ lesson.white_week.couple_name }}</p>
                <p class="m-0">{{ lesson.white_week.lecturer }}</p>
                <p class="m-0">
                  <span
                    v-for="(group, index) of lesson.white_week.groups"
                    :key="group + index"
                  > {{ group }} </span>
                </p>
              </template>
              <template
                v-if="Object.keys(lesson.green_week).length"
                v-slot:green
              >
                <div>
                  <p class="m-0">{{ lesson.green_week.couple_name }}</p>
                  <p class="m-0">{{ lesson.green_week.lecturer }}</p>
                  <p class="m-0">
                    <span
                      v-for="(group, index) of lesson.green_week.groups"
                      :key="group + index"
                    > {{ group }} </span>
                  </p>
                </div>
              </template>
            </TableCell>
            <TableCell>
              <template
                v-if="Object.keys(lesson.white_week).length"
                v-slot:white
              >{{ lesson.white_week.audience }}</template>
              <template
                v-if="Object.keys(lesson.green_week).length"
                v-slot:green
              >{{ lesson.green_week.audience }}</template>
            </TableCell>
          </TableRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { times } from '../../consts.js';

import TableRow from './components/TableRow.vue';
import TableCell from './components/TableCell.vue';

export default {
  name: 'ScheduleTable',
  components: {
    TableRow,
    TableCell,
  },
  data() {
    return {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье',],
      times: [],
    };
  },
  computed: {
    ...mapState({
      schedule: state => state.schedule.schedule,
    }),
    ...mapGetters({
      getSortedSchedule: 'schedule/getSortedSchedule',
    }),
  },
  watch: {
    schedule(value) {
      console.log(value);
    },
  },
  methods: {
    onClickTableRow(data) {
      this.$router.push({ query: {
        edit: true,
        id: data.id,
        day: data.day,
        time: data.time,
      } });
    },
  },
  created() {
    this.times = times;
  },
};
</script>
