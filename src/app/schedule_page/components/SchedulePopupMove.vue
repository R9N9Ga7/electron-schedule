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
import { mapState, mapActions } from 'vuex';
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
    };
  },
  computed: {
    ...mapState({
      type: (state) => state.schedule.type,
    }),
  },
  watch: {
    async color() {
      if (this.color.NAME !== this.$route.query.color_value) {
        const query = this.$route.query;
        query.color_id = this.color.ID;
        query.color_value = this.color.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });

        await this.sendDataAndResieve('color', this.color.ID);
      }
    },
    async day() {
      if (this.day.NAME !== this.$route.query.day_value) {
        const query = this.$route.query;
        query.day_id = this.day.ID;
        query.day_value = this.day.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });

        await this.sendDataAndResieve('day', this.day.ID);
      }
    },
    async time() {
      if (this.time.NAME !== this.$route.query.time_value) {
        const query = this.$route.query;
        query.time_id = this.time.ID;
        query.time_value = this.time.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });

        await this.sendDataAndResieve('time', this.time.ID);
      }
    },
  },
  methods: {
    ...mapActions({
      receiveSchedules: 'schedule/receiveSchedules',
    }),
    async sendDataAndResieve(field_name, value) {
      await postEditLesson({
        lesson_id: this.$route.query.lesson_id,
        field_name,
        value,
      });
      if (this.type === 'Группа') {
        await this.receiveSchedules({
          group: JSON.parse(this.$route.query.groups_id_for_recieve),
          target: 'group',
        });
      }
      if (this.type === 'Преподаватель') {
        await this.receiveSchedules({
          group: JSON.parse(this.$route.query.groups_id_for_recieve),
          target: 'teacher',
        });
      }
      if (this.type === 'Аудитория') {
        await this.receiveSchedules({
          group: JSON.parse(this.$route.query.groups_id_for_recieve),
          target: 'auditory',
        });
      }
      await this.recieveData();
    },
    onClose() {
      this.$router.push({ query: {} });
    },
    initSelectValues() {
      this.color = {
        NAME: this.$route.query.color_value,
        ID: this.$route.query.color_id,
      };

      this.day = {
        NAME: this.$route.query.day_value,
        ID: this.$route.query.day_id,
      };

      this.time = {
        NAME: this.$route.query.time_value,
        ID: this.$route.query.time_id,
      };
    },
    async recieveData() {
      this.colors = [];
      this.days = [];
      this.times = [];

      const colors = await getColors(this.$route.query.lesson_id);
      this.colors = colors.message;

      if (this.color) {
        const days = await getDays(this.$route.query.lesson_id);
        this.days = days.message;
      }

      if (this.time) {
        const times = await getTimes(this.$route.query.lesson_id);
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
