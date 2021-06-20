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
        <template>
          <p>Дисциплина</p>
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
        <template v-if="teacherCondition">
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
        <template v-if="disciplineTypesCondition">
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
        <template v-if="dayCondition">
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
        </template>
        <template v-if="colorCondition">
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
        <template v-if="timeCondition">
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
        <template v-if="auditoryCondition">
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
        <template v-if="streamCondition">
          <p>Поток</p>
          <v-select
            placeholder="Поток"
            :options="streams"
            :getOptionLabel="item => item.VALUE"
            label="VALUE"
            v-model="stream"
            :clearable="false"
            :loading="!streams.length"
          />
        </template>
      </div>
      <div
        v-if="streamCondition"
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
import { mapActions } from 'vuex';
import {
  getDays,
  getColors,
  getDisciplines,
  getTimes,
  getTeachers,
  getDisciplineTypes,
  getAudits,
  getStreams,
  postAddLesson,
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
      loading: false,
    };
  },
  computed: {
    teacherCondition() {
      return this.discipline.ID;
    },
    disciplineTypesCondition() {
      return this.teacher.ID;
    },
    dayCondition() {
      return this.disciplineType.ID;
    },
    colorCondition() {
      return this.day.ID && this.dayCondition;
    },
    timeCondition() {
      return this.color.ID;
    },
    auditoryCondition() {
      return this.time.ID;
    },
    streamCondition() {
      return this.audit.ID;
    },
  },
  watch: {
    async discipline(value) {
      if (value) {
        const teachers = await getTeachers(this.payload());
        this.teachers = teachers.message;
      }
    },
    async teacherCondition(value) {
      if (value) {
        const teachers = await getTeachers(this.payload());
        this.teachers = teachers.message;
      }
    },
    async disciplineTypesCondition(value) {
      if (value) {
        const disciplineTypes = await getDisciplineTypes(this.payload());
        this.disciplineTypes = disciplineTypes.message;
      }
    },
    async dayCondition(value) {
      if (value) {
        const days = await getDays(this.payload());
        this.days = days.message;
      }
    },
    async colorCondition(value) {
      if (value) {
        const colors = await getColors(this.payload());
        this.colors = colors.message;
      }
    },
    async timeCondition(value) {
      if (value) {
        const times = await getTimes(this.payload());
        this.times = times.message;
      }
    },
    async auditoryCondition(value) {
      if (value) {
        const audits = await getAudits(this.payload());
        this.audits = audits.message;
      }
    },
    async streamCondition(value) {
      if (value) {
        const streams = await getStreams(this.payload());
        this.streams = streams.message;
      }
    },
    // async day() {
    //   this.color = '';
    //   this.discipline = '';
    //   this.time = '';
    //   this.teacher = '';
    //   this.disciplineType = '';
    //   this.audit = '';

    //   if (this.day.ID) {
    //     const colors = await getColors(this.payload());
    //     this.colors = colors.message;
    //   }
    // },
    // async color() {
    //   this.discipline = '';
    //   this.time = '';
    //   this.teacher = '';
    //   this.disciplineType = '';
    //   this.audit = '';

    //   if (this.color.ID) {
    //     const disciplines = await getDisciplines(this.payload());
    //     this.disciplines = disciplines.message;
    //   }
    // },
    // async discipline() {
    //   this.time = '';
    //   this.teacher = '';
    //   this.disciplineType = '';
    //   this.audit = '';

    //   if (this.discipline.ID) {
    //     const times = await getTimes(this.payload());
    //     this.times = times.message;
    //   }
    // },
    // async time() {
    //   this.teacher = '';
    //   this.disciplineType = '';
    //   this.audit = '';

    //   if (this.time.ID) {
    //     const teachers = await getTeachers(this.payload());
    //     this.teachers = teachers.message;
    //   }
    // },
    // async teacher() {
    //   this.disciplineType = '';
    //   this.audit = '';

    //   if (this.teacher.ID) {
    //     const disciplineTypes = await getDisciplineTypes(this.payload());
    //     this.disciplineTypes = disciplineTypes.message;
    //   }
    // },
    // async disciplineType() {
    //   this.audit = '';

    //   if (this.discipline.ID) {
    //     const audits = await getAudits(this.payload());
    //     this.audits = audits.message;
    //   }
    // },
    // *******************
    // audit(value) {
    // },
  },
  methods: {
    ...mapActions({
      recieveSchedule: 'extended/recieveSchedule',
    }),
    onClose() {
      this.$router.push({ query: {} });
    },
    payload() {
      const payload = {
        groups_id: JSON.parse(this.$route.query.groups_id).map((el) => el.ID),
        discipline_id: this.discipline.ID,
        day_id: this.day.ID,
        color_id: this.color.ID,
      };

      if (this.time.ID) {
        payload.time_id = this.time.ID;
      }

      if (this.teacher.ID) {
        payload.teacher_id = this.teacher.ID;
      }

      if (this.disciplineType.ID) {
        payload.discipline_type_id = this.discipline.ID;
      }

      console.log(
        '===================>',
        payload
      );

      return payload;
    },
    async onSubmit() {
      this.loading = true;
      await postAddLesson({
        groups_id: JSON.parse(this.$route.query.groups_id).map((el) => el.ID),
        day_id: this.day.ID,
        color_id: this.color.ID,
        discipline_id: this.discipline.ID,
        time_id: this.time.ID,
        teacher_id: this.teacher.ID,
        discipline_type_id: this.disciplineType.ID,
        audit_id: this.audit.NAME, // странная вещь
        stream_id: this.stream.ID,
      });
      await this.recieveSchedule(JSON.parse(this.$route.query.groups_id).map((el) => el.ID));
      this.loading = false;
      this.$router.push({ query: {} });
    },
    styleColor(id) {
      return `color: ${AVAILABLE_COLOR[id]};`;
    },
  },
  async created() {
    this.dayData = JSON.parse(this.$route.query.day);
    console.log('this.dayData: ', this.dayData);

    this.day = {
      ID: this.dayData.weekDay.id,
      NAME: this.dayData.weekDay.value,
    }

    const disciplines = await getDisciplines(this.payload());
    this.disciplines = disciplines.message;

    // const days = await getDays(this.payload());
    // this.days = days.message;

    // const streams = await getStreams(this.payload());
    // this.streams = streams.message;
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
