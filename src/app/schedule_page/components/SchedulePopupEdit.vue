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
        <template v-if="type !== 'Преподаватель'">
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
        </template>
        <template v-if="type === 'Преподаватель' || type === 'Аудитория'">
          <p>Группы</p>
          <v-select
            placeholder="Группы"
            :options="groups"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="group"
            :clearable="false"
            :loading="!groups.length"
          />
        </template>
        <template v-if="type !== 'Аудитория'">
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
        </template>
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
      <!-- <button @click="onSubmit" class="btn btn-primary">Сохранить</button> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import {
  getDisciplines,
  getTeachers,
  getAuditories,
  getDisciplineTypes,
  getStreams,
  postEditLesson,
  getGroups,
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
      group: '',
      groups: [],
    };
  },
  watch: {
    async discipline() {
      if (this.discipline.ID !== this.$route.query.discipline_id) {
        await this.sendDataAndResieve('discipline', this.discipline.ID, 'discipline');

        const query = this.$route.query;
        query.discipline_id = this.discipline.ID;
        query.discipline_value = this.discipline.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });
      }
    },
    async teacher() {
      if (this.teacher.ID !== this.$route.query.teacher_id) {
        await this.sendDataAndResieve('teacher', this.teacher.ID, 'teacher');

        const query = this.$route.query;
        query.teacher_id = this.teacher.ID;
        query.teacher_value = this.teacher.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });
      }
    },
    async group() {
      if (this.group.ID !== this.$route.query.group_id) {
        const query = this.$route.query;
        query.group_id = this.group.ID;
        query.group_value = this.group.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });
        if (this.type === 'Преподаватель') {
          await this.sendDataAndResieve('group', this.group.ID, 'teacher');
        }
        if (this.type === 'Аудитория') {
          await this.sendDataAndResieve('group', this.group.ID, 'auditory');
        }
      }
    },
    async auditory() {
      if (this.auditory.NAME !== this.$route.query.auditory_value) {
        const query = this.$route.query;
        query.auditory_value = this.auditory.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });

        await this.sendDataAndResieve('auditory', this.auditory.NAME, 'auditory');
      }
    },
    async disciplineType() {
      if (this.disciplineType.NAME !== this.$route.query.lesson_type_value) {
        const query = this.$route.query;
        query.lesson_type_id = this.disciplineType.ID;
        query.lesson_type_value = this.disciplineType.NAME;
        this.$router.push({ query: {} });
        this.$router.push({ query });

        await this.sendDataAndResieve('disciplineType', this.disciplineType.ID, 'disciplineType');
      }
    },
    async stream() {
      if (this.stream.VALUE !== this.$route.query.stream_value) {
        const query = this.$route.query;
        query.stream_value = this.stream.VALUE;
        this.$router.push({ query: {} });
        this.$router.push({ query });

        await this.sendDataAndResieve('stream', this.stream.ID, 'stream');
      }
    },
  },
  computed: {
    ...mapState({
      type: (state) => state.schedule.type,
    }),
  },
  methods: {
    ...mapActions({
      receiveSchedules: 'schedule/receiveSchedules',
    }),
    onClose() {
      this.$router.push({ query: {} });
    },
    async sendDataAndResieve(field_name, value, target) {
      await postEditLesson({
        lesson_id: this.$route.query.lesson_id,
        field_name,
        value,
      });
      this.reciveveData();
      const payload = {};

      if (this.type === 'Группа') {
        payload.target = 'group';
        payload.group = JSON.parse(this.$route.query.groups_id_for_recieve);
      }

      if (this.type === 'Преподаватель') {
        payload.target = 'teacher';
        payload.group = JSON.parse(this.$route.query.groups_id_for_recieve);
      }

      if (this.type === 'Аудитория') {
        payload.target = 'auditory';
        payload.group = JSON.parse(this.$route.query.groups_id_for_recieve);
      }
      await this.receiveSchedules(payload);

    },
    reciveveData() {
      this.disciplines = [];
      this.teachers = [];
      this.auditories = [];
      this.disciplineTypes = [];
      this.streams = [];
      this.groups = [];

      this.asyncGetDisciplines();
      this.asyncGetTeachers();
      this.asyncGetGroups();
      this.asyncGetFuditories();
      this.asyncGetDisciplineTypess();
      this.asyncGetStreams();
    },
    async asyncGetDisciplines() {
      const disciplines = await getDisciplines(this.$route.query.lesson_id);
      this.disciplines = disciplines.message;
    },
    async asyncGetTeachers() {
      const teachers = await getTeachers(this.$route.query.lesson_id);
      this.teachers = teachers.message;
    },
    async asyncGetGroups() {
      const groups = await getGroups(this.$route.query.lesson_id);
      this.groups = groups.message;
      this.group = groups.message.find((el) => el.NAME === this.$route.query.group_value);
    },
    async asyncGetFuditories() {
      const auditories = await getAuditories(this.$route.query.lesson_id);
      this.auditories = auditories.message;
      this.auditory = auditories.message.find((el) => el.NAME === this.$route.query.auditory_value);
    },
    async asyncGetDisciplineTypess() {
      const disciplineTypes = await getDisciplineTypes(this.$route.query.lesson_id);
      this.disciplineTypes = disciplineTypes.message;
    },
    async asyncGetStreams() {
      const streams = await getStreams(this.$route.query.lesson_id);
      this.streams = streams.message;
      this.stream = streams.message.find((el) => el.VALUE === this.$route.query.stream_value);
    },
    initSelectValues() {
      this.discipline = {
        NAME: this.$route.query.discipline_value,
        ID: this.$route.query.discipline_id,
      };

      this.teacher = {
        NAME: this.$route.query.teacher_value,
        ID: this.$route.query.teacher_id,
      };

      this.disciplineType = {
        NAME: this.$route.query.lesson_type_value,
        ID: this.$route.query.lesson_type_id,
      };

      this.group = {
        NAME: this.$route.query.group_value,
        ID: this.$route.query.group_id,
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
