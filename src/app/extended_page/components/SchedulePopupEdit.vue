<template>
  <div
    class="w-100 h-100 top-0 start-0 position-fixed popup d-flex align-items-center justify-content-center"
  >
    <div
      class="bg-white p-2 rounded"
      style="max-width: 70vw; width: 100%; min-height: 360px;"
    >
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-danger"
          @click="onClose"
        >X</button>
      </div>
      <div>
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
        <p>Преподаватель</p>
        <v-select
          placeholder="Преподаватель"
          :options="teachers"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          v-model="teacher"
          :clearable="false"
          :loading="!teachers.length"
        />
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
        <p>Аудитория</p>
        <v-select
          placeholder="Аудитория"
          :options="auditories"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          v-model="auditory"
          :clearable="false"
          :loading="!auditories.length"
        >
          <template #option="{ NAME, AVAILABLE }">
            <span>{{ NAME }} </span>
            <span :style="styleColor(AVAILABLE)"> •</span>
          </template>
        </v-select>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  getDisciplines,
  getTeachers,
  getAuditories,
  getDisciplineTypes,
  getStreams,
  postEditLesson,
} from '../services/edit_schedule.service';

import { AVAILABLE_COLOR } from '../../../consts';

export default {
  name: 'SchedulePopupEdit',
  data() {
    return {
      discipline: '',
      disciplines: [],
      teacher: '',
      teachers: [],
      stream: '',
      streams: [],
      auditory: '',
      auditories: [],
      disciplineType: '',
      disciplineTypes: [],
      lesson: {},
    };
  },
  watch: {
    // discipline() {
    //   if (this.discipline.ID) {
    //     const query = this.$route.query;
    //     query.discipline_id = this.discipline.ID;
    //     query.discipline_value = this.discipline.NAME;
    //     this.$router.push({ query: {} });
    //     this.$router.push({ query });
    //     this.reciveveData();
    //   }
    // },
    async discipline() {
      if (this.discipline.ID !== this.lesson.discipline.id) {
        await this.sendDataAndResieve('discipline', this.discipline.ID);
      }
    },
    async teacher() {
      if (this.teacher.ID !== this.lesson.teacher.id) {
        await this.sendDataAndResieve('teacher', this.teacher.ID);
      }
    },
    async auditory() {
      if (this.auditory.NAME !== this.lesson.auditory.value) {
        await this.sendDataAndResieve('auditory', this.auditory.NAME);
      }
    },
    async disciplineType() {
      if (this.disciplineType.NAME !== this.lesson.timeTable.lessonType.value) {
        await this.sendDataAndResieve('disciplineType', this.disciplineType.ID);
      }
    },
    async stream() {
      if (this.stream.VALUE !== this.lesson.group.setGroupValue) {
        await this.sendDataAndResieve('stream', this.stream.ID);
      }
    },
  },
  methods: {
    ...mapActions({
      recieveSchedule: 'extended/recieveSchedule',
    }),
    onClose() {
      this.$router.push({ query: {} });
    },
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
      await this.reciveveData();
    },
    async reciveveData() {
      this.disciplines = [];
      this.teachers = [];
      this.auditories = [];
      this.disciplineTypes = [];
      this.streams = [];

      const groups = JSON.parse(this.$route.query.groups_id).map((el) => el.ID);
      const payload = {
        groups_id: groups,
        discipline_id: this.lesson.discipline.id,
        color_id: this.lesson.timeTable.weekColor.id,
        day_id: this.lesson.timeTable.weekDay.id,
        time_id: this.lesson.timeTable.classTime.id,
      };
      const disciplines = await getDisciplines(payload);
      this.disciplines = disciplines.message;

      const teachers = await getTeachers(payload);
      this.teachers = teachers.message;

      payload.teacher_id = this.teacher.ID;

      const disciplineTypes = await getDisciplineTypes(payload);
      this.disciplineTypes = disciplineTypes.message;

      payload.discipline_type_id = this.disciplineType.ID;

      const auditories = await getAuditories(payload);
      this.auditories = auditories.message;
      this.auditory = auditories.message.find((el) => el.NAME === this.lesson.auditory.value);


      const streams = await getStreams(payload);
      this.streams = streams.message;
      this.stream = streams.message.find((el) => el.VALUE === this.lesson.group.setGroupValue);
    },
    initSelectValues() {
      this.lesson = JSON.parse(this.$route.query.lesson);
      console.log('this.lesson: ', this.lesson);

      this.discipline = {
        NAME: this.lesson.discipline.value,
        ID: this.lesson.discipline.id,
      };

      this.teacher = {
        NAME: this.lesson.teacher.name,
        ID: this.lesson.teacher.id,
      };

      this.disciplineType = {
        NAME: this.lesson.timeTable.lessonType.value,
        ID: this.lesson.timeTable.lessonType.id,
      };
    },
    styleColor(id) {
      return `color: ${AVAILABLE_COLOR[id]};`;
    },
    onSubmit() {
      postEditSchedule({
        lesson_id: this.$route.query.lesson_id,
        discipline_id: this.discipline.ID,
        teacher_id: this.teacher.ID,
        audit_id: this.auditory.NAME,
        discipline_type_id: this.disciplineType.ID,
        stream_id: this.stream.VALUE,
      });
    },
  },
  created() {
    this.initSelectValues();
    this.reciveveData();
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
