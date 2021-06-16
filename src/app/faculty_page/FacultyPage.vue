<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Факультеты"
        :options="faculties"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        v-model="faculty"
        :clearable="false"
        :loading="!faculties.length"
        style="min-width: 400px;"
      />
    </div>
    <div
      v-if="Object.keys(facultyInfo).length !== 0"
      class="mt-4"
    >
      <hr>
      <h3>{{ facultyInfo.NAME }}</h3>
      <div class="m-1">
        <p class="m-0">
          <strong>Часы</strong>
          <span class="ms-3">{{ facultyInfo.hours }}</span>
        </p>
      </div>
      <div class="d-inline-block m-1">
        <p class="m-0">Название факультета</p>
        <input
          type="text"
          class="form-control d-inline-block"
          v-model="facultyName"
          style="width: 300px;"
        >
      </div>
    </div>
    <div class="btn-group mt-3 d-block">
      <button
        @click="onClickSave"
        v-if="Object.keys(facultyInfo).length !== 0"
        type="button"
        class="btn btn-primary"
      >Сохранить</button>
      <button @click="onClickAdd" type="button" class="btn btn-success">Добавить</button>
      <button
        @click="onClickRemove"
        v-if="Object.keys(facultyInfo).length !== 0"
        type="button"
        class="btn btn-danger"
      >Удалить</button>
    </div>
  </div>
</template>

<script>
import {
  getFaculties,
  getFaculty,
  updateFaculty,
  postFaculty,
  deleteFaculty,
} from './faculty.service';

export default {
  name: 'FacultyPage',
  data() {
    return {
      faculty: '',
      faculties: [],
      facultyInfo: {},
      facultyName: '',
    };
  },
  watch: {
    async faculty() {
      if (this.faculty.ID) {
        const facultyInfo = await getFaculty(this.faculty.ID);
        this.facultyInfo = facultyInfo.message;
        this.facultyName = this.facultyInfo.NAME;
      }
    },
  },
  methods: {
    async onClickSave() {
      await updateFaculty(this.faculty.ID, this.facultyName);
      await this.recieveData();
      const copy = JSON.parse(JSON.stringify(this.faculty));
      copy.NAME = this.facultyName;
      this.faculty = '';
      this.faculty = copy;
    },
    async recieveData() {
      const faculties = await getFaculties();
      this.faculties = faculties.message;
    },
    async onClickAdd() {
      const id = await postFaculty();
      await this.recieveData();
      const facultyInfo = await getFaculty(id.message);
      this.facultyInfo = facultyInfo.message;
      this.facultyName = this.facultyInfo.NAME;
      this.faculty = {
        NAME: this.facultyName,
        ID: id.message,
      };
    },
    async onClickRemove() {
      await deleteFaculty(this.faculty.ID);
      this.facultyInfo = {};
      this.faculty = '';
      await this.recieveData();
    },
  },
  async created() {
    this.recieveData();
  },
};
</script>
