<template>
  <div class="popup vw-100 vh-100 position-fixed top-0 start-0 py-4 px-5 d-flex align-items-center justify-content-center">
    <div
      class="bg-white rounded p-2"
      style="width: 460px;"
    >
      <div class="d-flex justify-content-between align-items-center">
        <h2>Параметры поиска</h2>
        <button
          @click="onClose"
          class="btn btn-danger fs-6"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="mt-4 search-parameters__body">
        <v-select
          placeholder="Факультет"
          :options="faculty"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :value="facultyValue"
          @input="setFacultyValue"
          :clearable="false"
        />
        <v-select
          v-if="facultyValue"
          placeholder="Кафедра"
          :options="department"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :value="departmentValue"
          @input="setDepartmentValue"
          :clearable="false"
        />
        <v-select
          v-if="departmentValue"
          placeholder="Курс"
          :options="course"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :value="courseValue"
          @input="setCourseValue"
          :clearable="false"
        />
        <v-select
          v-if="facultyValue && departmentValue && courseValue"
          placeholder="Группа"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :options="group"
          :clearable="false"
          :value="groupValue"
          @input="setGroupValue"
          multiple
        />
      </div>
      <div class="search-parameters__footer d-flex align-items-end">
        <button @click="onSubmit" class="btn btn-primary" type="button">Поиск</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'SchedulePopupCriteria',
  computed: {
    ...mapState({
      faculty: (state) => state.schedule.faculty,
      facultyValue: (state) => state.schedule.facultyValue,
      department: (state) => state.schedule.department,
      departmentValue: (state) => state.schedule.departmentValue,
      course: (state) => state.schedule.course,
      courseValue: (state) => state.schedule.courseValue,
      group: (state) => state.schedule.group,
      groupValue: (state) => state.schedule.groupValue,
    }),
  },
  watch: {
    facultyValue(value) {
      this.setDepartmentValue('');
      this.setCourseValue('');
      this.setGroupValue('');

      if (this.facultyValue) {
        this.recieveDepartment(value.ID);
      }
    },
    departmentValue() {
      this.setCourseValue('');
      this.setGroupValue('');

      this.recieveCourse();
    },
    courseValue() {
      this.setGroupValue('');

      if (this.courseValue) {
        this.recieveGroup({
          faculty: this.facultyValue.ID,
          department: this.departmentValue.ID,
          course: this.courseValue.ID,
        });
      }
    },
  },
  methods: {
    ...mapActions({
      recieveFaculty: 'schedule/recieveFaculty',
      recieveDepartment: 'schedule/recieveDepartment',
      recieveCourse: 'schedule/recieveCourse',
      recieveGroup: 'schedule/recieveGroup',
      receiveSchedules: 'schedule/receiveSchedules',
    }),
    ...mapMutations({
      setFacultyValue: 'schedule/setFacultyValue',
      setDepartmentValue: 'schedule/setDepartmentValue',
      setCourseValue: 'schedule/setCourseValue',
      setGroupValue: 'schedule/setGroupValue',
    }),
    onClose() {
      this.$emit('close');
    },
    onSubmit() {
      this.receiveSchedules(this.groupValue.map((el) => el.ID));
      this.onClose();
    },
  },
  created() {
    this.recieveFaculty();
  },
};
</script>

<style lang="scss" scoped>
.v-select {
  margin: 5px 0;
}
</style>
