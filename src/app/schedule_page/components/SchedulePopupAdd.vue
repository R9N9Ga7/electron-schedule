<template>
  <div
    class="w-100 h-100 top-0 start-0 position-fixed popup d-flex align-items-center justify-content-center"
  >
    <div
      class="bg-white p-2 rounded"
      style="max-width: 60vw; width: 100%; min-height: 260px;"
    >
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-danger"
          @click="onClose"
        >X</button>
      </div>
      <div>
        <p>День</p>
        <v-select
          placeholder="День"
          :options="days"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          v-model="day"
          :clearable="false"
          :loading="!days.length"
        />
        <template v-if="day.ID">
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
        </template>
        <template v-if="(type === 'Преподаватель' || type === 'Аудитория') && color.ID">
          <p>Группа</p>
          <v-select
            placeholder="Группа"
            :options="groups"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="group"
            :clearable="false"
            class="auditory-select"
            :loading="!groups.length"
          />
        </template>
        <template v-if="color.ID">
          <p>Дисциплина</p>
          <!-- <v-select
            v-if="type === 'Преподаватель' || type === 'Аудитория'"
            placeholder="Дисциплина"
            :options="disciplinesAll"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="discipline"
            :clearable="false"
            :loading="!disciplinesAll.length"
          /> -->
          <v-select
            placeholder="Дисциплина"
            :options="disciplines"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="discipline"
            :clearable="false"
            :loading="!disciplines.length"
          />
        </template>
        <template v-if="discipline.ID">
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
        <template v-if="time.ID && type !== 'Преподаватель'">
          <p>Преподаватель</p>
          <v-select
            placeholder="Преподаватель"
            :options="teachers"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="teacher"
            :clearable="false"
            class="auditory-select"
            :loading="!teachers.length"
          />
        </template>
        <template v-if="time.ID">
          <p>Тип занятия</p>
          <v-select
            placeholder="Тип занятия"
            :options="disciplineTypes"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="disciplineType"
            :clearable="false"
            :loading="!disciplineTypes.length"
          />
        </template>
        <template v-if="disciplineType.ID && type !== 'Аудитория'">
          <p>Аудитория</p>
          <v-select
            placeholder="Аудитория"
            :options="audits"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="audit"
            :clearable="false"
            class="auditory-select"
            :loading="!audits.length"
          >
            <template #option="{ NAME, AVAILABLE }">
              <span>{{ NAME }} </span>
              <span :style="styleColor(AVAILABLE)"> •</span>
            </template>
          </v-select>
        </template>
        <template v-if="audit.ID || disciplineType.ID">
          <p>Поток</p>
          <v-select
            placeholder="Поток"
            :options="streams"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="stream"
            :clearable="false"
            :loading="!streams.length"
          />
        </template>
      </div>
      <div
        v-if="stream.ID"
        class="d-flex align-items-center"
      >
        <button
          @click="onSubmit"
          class="btn btn-primary"
        >Сохранить</button>
        <div v-if="loading" class="spinner-border ms-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import {
  getDays,
  getColors,
  getDisciplines,
  getTimes,
  getTeachers,
  getDisciplineTypes,
  getAudits,
  getStreams,
  getGroups,
  getDisciplinesAll,
  postAddSchedule,
} from '../services/add_schedule.service';

import { AVAILABLE_COLOR } from '../../../consts';

export default {
  name: 'SchedulePopupAdd',
  data() {
    return {
      day: '',
      days: [],
      color: '',
      colors: [],
      discipline: '',
      disciplines: [],
      disciplinesAll: [],
      time: '',
      times: [],
      teacher: '',
      teachers: [],
      disciplineType: '',
      disciplineTypes: [],
      audit: '',
      audits: [],
      stream: '',
      streams: [],
      group: '',
      groups: [],
      loading: false,
    };
  },
  computed: {
    ...mapState({
      type: (state) => state.schedule.type,
    }),
  },
  watch: {
    async day() {
      this.color = '';
      this.discipline = '';
      this.time = '';
      this.teacher = '';
      this.disciplineType = '';
      this.audit = '';

      if (this.day.ID) {
        const colors = await getColors(this.$route.query.group_id);
        this.colors = colors.message;
      }
    },
    async color() {
      this.discipline = '';
      this.time = '';
      this.teacher = '';
      this.disciplineType = '';
      this.audit = '';

      if (this.color.ID) {
        if (this.type === 'Группа') {
          const disciplines = await getDisciplines(this.$route.query.group_id);
          this.disciplines = disciplines.message;
        }
        if (this.type === 'Преподаватель' || this.type === 'Аудитория') {
          console.log('=====> ', this.group.ID);
          const disciplines = await getDisciplines(this.group.ID);
          this.disciplines = disciplines.message;
        }
      }
    },
    async group() {
      this.discipline = '';
      this.time = '';
      this.disciplineType = '';
      this.audit = '';

      if (this.group.ID) {
        if (this.type === 'Группа') {
          const disciplines = await getDisciplines(this.$route.query.group_id);
          this.disciplines = disciplines.message;
        }
        if (this.type === 'Преподаватель' || this.type === 'Аудитория') {
          console.log('=====> ', this.group.ID);
          const disciplines = await getDisciplines(this.group.ID);
          this.disciplines = disciplines.message;
        }
        const streams = await getStreams(this.payload());
        this.streams = streams.message;
      }
    },
    async discipline() {
      this.time = '';
      this.teacher = '';
      this.disciplineType = '';
      this.audit = '';

      if (this.discipline.ID) {
        const times = await getTimes(this.payload());
        this.times = times.message;
      }
    },
    async time() {
      this.teacher = '';
      this.disciplineType = '';
      this.audit = '';

      if (this.time.ID) {
        const teachers = await getTeachers(this.payload());
        this.teachers = teachers.message;
        const disciplineTypes = await getDisciplineTypes(this.payload());
        this.disciplineTypes = disciplineTypes.message;
      }
    },
    async teacher() {
      this.disciplineType = '';
      this.audit = '';

      if (this.teacher.ID) {
        const disciplineTypes = await getDisciplineTypes(this.payload());
        this.disciplineTypes = disciplineTypes.message;
      }
    },
    async disciplineType() {
      this.audit = '';

      if (this.discipline.ID) {
        const audits = await getAudits(this.payload());
        this.audits = audits.message;
      }
    },
    // *******************
    audit(value) {
    },
  },
  methods: {
    ...mapActions({
      receiveSchedules: 'schedule/receiveSchedules',
    }),
    onClose() {
      this.$router.push({ query: {} });
    },
    payload() {
      const payload = {
        group_id: this.$route.query.group_id,
        discipline_id: this.discipline.ID,
        day_id: this.day.ID,
        color_id: this.color.ID,
      };

      if (this.type !== 'Группа') {
        if (this.group.ID) {
          payload.group_id = this.group.ID;
        }
      }

      if (this.time.ID) {
        payload.time_id = this.time.ID;
      }

      if (this.teacher.ID) {
        payload.teacher_id = this.teacher.ID;
      }

      if (this.disciplineType.ID) {
        payload.discipline_type_id = this.discipline.ID;
      }

      return payload;
    },
    async onSubmit() {
      this.loading = true;
      const payload = {
        day_id: this.day.ID,
        color_id: this.color.ID,
        discipline_id: this.discipline.ID,
        time_id: this.time.ID,
        discipline_type_id: this.disciplineType.ID,
        audit_id: this.audit.NAME, // странная вещь
        stream_id: this.stream.ID,
      };

      if (this.type === 'Группа') {
        payload.group_id = this.$route.query.group_id;
      } else {
        payload.group_id = this.group.ID;
      }

      if (this.type === 'Аудитория') {
        payload.audit_id = this.$route.query.group_id;
      }

      if (this.type === 'Преподаватель') {
        payload.teacher_id = this.$route.query.group_id;
      } else {
        payload.teacher_id = this.teacher.ID;
      }

      await postAddSchedule(payload);

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
      this.loading = false;
      this.$router.push({ query: {} });
    },
    styleColor(id) {
      return `color: ${AVAILABLE_COLOR[id]};`;
    },
  },
  async created() {
    this.day = {
      ID: this.$route.query.week_day_id,
      NAME: this.$route.query.week_day_value,
    }

    const days = await getDays(this.$route.query.group_id);
    this.days = days.message;

    const groups = await getGroups();
    this.groups = groups.message;

    const streams = await getStreams(this.payload());
    this.streams = streams.message;


    // const disciplinesAll = await getDisciplinesAll();
    // this.disciplinesAll = disciplinesAll.message;
  },
};
</script>

<style lang="scss">
.v-select .vs__dropdown-menu {
  max-height: 150px!important;
}

.v-select .vs__dropdown-toggle .vs__selected-options .vs__selected {
  // display: flex;
  // overflow: hidden;
  // height: 1rem;
  // height: 100%;
  // transform: translateY(2px);
  // align-items: flex-start;
}
</style>

<style lang="scss" scoped>
.v-select {
  margin: 5px 0;
}

p {
  margin: 0;
}
</style>
