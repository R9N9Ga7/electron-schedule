<template>
  <div class="w-100 h-100 top-0 start-0 position-fixed popup d-flex align-items-center justify-content-center">
    <div
      class="bg-white p-2 rounded"
      style="max-width: 30vw; width: 100%; min-height: 260px;"
    >
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-danger"
          @click="onClose"
        >X</button>
      </div>
      <div>
        <p>Цвет</p>
        <v-select
          placeholder="Цвет"
          :options="colors"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          v-model="color"
          :clearable="false"
          :loading="!colors.length"
        />
        <template v-if="color.ID">
          <p>День недели</p>
          <v-select
            placeholder="День недели"
            :options="days"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="day"
            :clearable="false"
            :loading="!days.length"
          />
        </template>
        <template v-if="day.ID">
          <p>Время</p>
          <v-select
            placeholder="Время"
            :options="times"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="time"
            :clearable="false"
            :loading="!times.length"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  getColors,
  getDays,
  getTimes,
} from '../services/move_schedule.service';
import {
  postEditLesson,
} from '../services/edit_schedule.service';

export default {
  name: 'SchedulePopupMove',
  data() {
    return {
      color: '',
      colors: [],
      day: '',
      days: [],
      time: '',
      times: [],
      lesson: {},
    };
  },
  watch: {
    async color() {
      if (this.color.NAME !== this.lesson.timeTable.weekColor.value) {
        await this.sendDataAndResieve('color', this.color.ID);
      }
    },
    async day() {
      if (this.day.NAME !== this.lesson.timeTable.weekDay.value) {
        await this.sendDataAndResieve('day', this.day.ID);
      }
    },
    async time() {
      if (this.time.NAME !== this.lesson.timeTable.classTime.value) {
        await this.sendDataAndResieve('time', this.time.ID);
      }
    },
  },
  methods: {
    ...mapActions({
      recieveSchedule: 'extended/recieveSchedule',
    }),
    async sendDataAndResieve(field_name, value) {
      await postEditLesson({
        lesson_id: this.lesson.timeTable.OID,
        field_name,
        value,
        groups_id: JSON.parse(this.$route.query.groups_id).map((el) => el.ID),
      });
      await this.recieveSchedule(
        JSON.parse(this.$route.query.groups_id).map((el) => el.ID),
      );
      await this.recieveData();
    },
    onClose() {
      this.$router.push({ query: {} });
    },
    payload() {
      const payload = {
        groups_id: JSON.parse(this.$route.query.groups_id).map((el) => el.ID),
        day_id: this.day.ID,
        color_id: this.color.ID,
        time_id: this.time.ID,
      };

      return payload;
    },
    initSelectValues() {
      this.lesson = JSON.parse(this.$route.query.lesson);
      console.log('this.lesson: ', this.lesson);

      this.color = {
        NAME: this.lesson.timeTable.weekColor.value,
        ID: this.lesson.timeTable.weekColor.id,
      };

      this.day = {
        NAME: this.lesson.timeTable.weekDay.value,
        ID: this.lesson.timeTable.weekDay.id,
      };

      this.time = {
        NAME: this.lesson.timeTable.classTime.value,
        ID: this.lesson.timeTable.classTime.id,
      };
    },
    async recieveData() {
      this.colors = [];
      this.days = [];
      this.times = [];

      const colors = await getColors(this.payload());
      this.colors = colors.message;

      if (this.color) {
        const days = await getDays(this.payload());
        this.days = days.message;
      }

      if (this.time) {
        const times = await getTimes(this.payload());
        this.times = times.message;
      }
    },
    onSubmit() {
      console.log('color: ', this.color, 'time: ', this.time);
    },
  },
  created() {
    this.initSelectValues();
    this.recieveData();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.v-select {
  margin: 5px 0;
}
</style>
