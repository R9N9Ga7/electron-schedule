<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Кафедры"
        :options="departments"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        v-model="department"
        :clearable="false"
        :loading="!departments.length"
        style="min-width: 400px;"
      />
    </div>
    <div
      v-if="Object.keys(departmentInfo).length !== 0"
      class="mt-4"
    >
      <hr>
      <h3>{{ departmentInfo.NAME }}</h3>
      <div class="m-1">
        <p class="m-0">
          <strong>Часы</strong>
          <span class="ms-3">{{ departmentInfo.hours }}</span>
        </p>
      </div>
      <div class="d-inline-block m-1">
        <p class="m-0">Название кафедры</p>
        <input
          type="text"
          class="form-control d-inline-block"
          v-model="departmentName"
          style="width: 300px;"
        >
      </div>
      <div class="d-inline-block m-1">
        <p class="m-0">Факультет</p>
        <v-select
          placeholder="Факультет"
          :options="faculties"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          v-model="faculty"
          :clearable="false"
          :loading="!faculties.length"
          style="min-width: 400px;"
        />
      </div>
    </div>
    <div class="btn-group mt-3 d-block">
      <button
        v-if="Object.keys(departmentInfo).length !== 0"
        @click="onClickSave"
        type="button"
        class="btn btn-primary"
      >Сохранить</button>
      <button @click="onClickAdd" type="button" class="btn btn-success">Добавить</button>
      <button
        @click="onClickRemove"
        v-if="Object.keys(departmentInfo).length !== 0"
        type="button"
        class="btn btn-danger"
      >Удалить</button>
    </div>
  </div>
</template>

<script>
import {
  getDepartments,
  getDepartment,
  getFaculties,
  updateDepartment,
  postDepartment,
  deleteDepartment,
} from './department.service';

export default {
  name: 'DepartmentPage',
  data() {
    return {
      department: '',
      departments: [],
      departmentInfo: {},
      departmentName: '',
      faculties: [],
      faculty: '',
    };
  },
  watch: {
    async department() {
      if (this.department.ID) {
        this.departmentInfo = {};

        const departmentInfo = await getDepartment(this.department.ID);
        this.departmentInfo = departmentInfo.message;
        this.departmentName = this.departmentInfo.NAME;

        const faculties = await getFaculties();
        this.faculties = faculties.message;
        this.faculty = this.faculties.find((el) => el.ID === this.departmentInfo.FACULTY);
      }
    },
  },
  methods: {
    async onClickSave() {
      await updateDepartment({
        department_id: this.department.ID,
        name: this.departmentName,
        faculty_id: this.faculty.ID,
      });

      const departments = await getDepartments();
      this.departments = departments.message;

      const departmentInfo = await getDepartment(this.department.ID);
      this.departmentInfo = departmentInfo.message;
      this.departmentName = this.departmentInfo.NAME;
    },
    async onClickAdd() {
      const id = await postDepartment();

      const departments = await getDepartments();
      this.departments = departments.message;

      const departmentInfo = await getDepartment(id.message);
      this.departmentInfo = departmentInfo.message;
      this.departmentName = this.departmentInfo.NAME;

      this.department = {
        ID: id.message,
        NAME: this.departmentName,
      };

      const faculties = await getFaculties();
      this.faculties = faculties.message;
      this.faculty = this.faculties.find((el) => el.ID === this.departmentInfo.FACULTY);
    },
    async onClickRemove() {
      await deleteDepartment(this.department.ID);
      this.department = '';
      this.departmentInfo = {};
      const departments = await getDepartments();
      this.departments = departments.message;
    },
  },
  async created() {
    const departments = await getDepartments();
    this.departments = departments.message;
  },
};
</script>
