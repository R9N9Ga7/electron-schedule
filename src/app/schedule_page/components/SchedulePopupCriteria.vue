<template>
  <div class="popup vw-100 vh-100 position-fixed top-0 start-0 py-4 px-5 d-flex align-items-center justify-content-center">
    <div
      class="bg-white rounded p-2"
      style="width: 70vw;"
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
          placeholder="Объект поиска"
          :options="[
            'Преподаватель',
            'Группа',
            'Аудитория',
          ]"
          :value="type"
          @input="setType"
          :clearable="false"
        />
        <v-select
          v-if="type && type !== 'Аудитория'"
          placeholder="Факультет"
          :options="faculty"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :value="facultyValue"
          @input="setFacultyValue"
          :loading="!faculty.length"
          :clearable="false"
        />
        <v-select
          v-if="facultyValue && type !== 'Аудитория'"
          placeholder="Кафедра"
          :options="department"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :value="departmentValue"
          @input="setDepartmentValue"
          :loading="!department.length"
          :clearable="false"
        />
        <v-select
          v-if="isCourse()"
          placeholder="Курс"
          :options="course"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :value="courseValue"
          @input="setCourseValue"
          :loading="!course.length"
          :clearable="false"
        />
        <v-select
          v-if="facultyValue && departmentValue && courseValue && type === 'Группа'"
          placeholder="Группа"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :options="group"
          :clearable="false"
          :value="groupValue"
          @input="setGroupValue"
          :loading="!group.length"
          multiple
        />
        <v-select
          v-if="isTeacher()"
          placeholder="Преподаватель"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :options="teachers"
          :clearable="false"
          :value="teacher"
          @input="setTeacher"
          :loading="!teachers.length"
          multiple
        />
        <v-select
          v-if="isAuditoryType()"
          placeholder="Тип аудитории"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :options="auditoryTypes"
          :clearable="false"
          :value="auditoryType"
          @input="setAuditoryType"
          :loading="!auditoryTypes.length"
        />
        <v-select
          v-if="isAuditory()"
          placeholder="Аудитория"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          :options="auditories"
          :clearable="false"
          :value="auditory"
          @input="setAuditory"
          :loading="!auditories.length"
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
      type: (state) => state.schedule.type,
      faculty: (state) => state.schedule.faculty,
      facultyValue: (state) => state.schedule.facultyValue,
      department: (state) => state.schedule.department,
      departmentValue: (state) => state.schedule.departmentValue,
      course: (state) => state.schedule.course,
      courseValue: (state) => state.schedule.courseValue,
      group: (state) => state.schedule.group,
      groupValue: (state) => state.schedule.groupValue,
      teachers: (state) => state.schedule.teachers,
      teacher: (state) => state.schedule.teacher,
      auditory: (state) => state.schedule.auditory,
      auditories: (state) => state.schedule.auditories,
      auditoryTypes: (state) => state.schedule.auditoryTypes,
      auditoryType: (state) => state.schedule.auditoryType,
    }),
  },
  watch: {
    type() {
      this.setFacultyValue('');
      this.setDepartmentValue('');
      this.setCourseValue('');
      this.setGroupValue('');
      this.setTeacher('');
      this.setAuditory('');
      this.setAuditoryType('');

      this.recieveFaculty();
      this.recieveAuditoryTypes();
    },
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
      this.recieveTeachers({
        faculty: this.facultyValue.ID,
        department: this.departmentValue.ID,
        course: this.courseValue.ID,
      });
      this.recieveAuditories({
        faculty: this.facultyValue.ID,
        department: this.departmentValue.ID,
        course: this.courseValue.ID,
      });
    },
    courseValue() {
      this.setGroupValue('');

      if (this.courseValue) {
        if (this.type === 'Группа') {
          this.recieveGroup({
            faculty: this.facultyValue.ID,
            department: this.departmentValue.ID,
            course: this.courseValue.ID,
          });
        }

        if (this.type === 'Преподаватель') {
          this.recieveTeachers({
            faculty: this.facultyValue.ID,
            department: this.departmentValue.ID,
            course: this.courseValue.ID,
          });
        }

        if (this.type === 'Аудитория') {
          this.recieveAuditories({ auditory_type: this.auditoryType.ID });
        }
      }
    },
    auditoryType() {
      if (this.auditoryType.ID) {
        this.recieveAuditories(this.auditoryType.ID );
      }
    },
  },
  methods: {
    isCourse() {
      if (this.type !== 'Преподаватель' && this.type !== 'Аудитория') {
        if (this.departmentValue) {
          return true;
        }
      }
      return false;
    },
    isTeacher() {
      if (this.type === 'Преподаватель') {
        if (this.departmentValue) {
          return true;
        }
      }
      return false;
    },
    isAuditory() {
      if (this.type === 'Аудитория') {
        if (this.auditoryType.ID) {
          return true;
        }
      }
      return false;
    },
    isAuditoryType() {
      if (this.type === 'Аудитория') {
        return true;
      }
      return false;
    },
    ...mapActions({
      recieveFaculty: 'schedule/recieveFaculty',
      recieveDepartment: 'schedule/recieveDepartment',
      recieveCourse: 'schedule/recieveCourse',
      recieveGroup: 'schedule/recieveGroup',
      receiveSchedules: 'schedule/receiveSchedules',
      recieveTeachers: 'schedule/recieveTeachers',
      recieveAuditories: 'schedule/recieveAuditories',
      recieveAuditoryTypes: 'schedule/recieveAuditoryTypes',
    }),
    ...mapMutations({
      setType: 'schedule/setType',
      setFacultyValue: 'schedule/setFacultyValue',
      setDepartmentValue: 'schedule/setDepartmentValue',
      setCourseValue: 'schedule/setCourseValue',
      setGroupValue: 'schedule/setGroupValue',
      setTeacher: 'schedule/setTeacher',
      setAuditory: 'schedule/setAuditory',
      setAuditoryType: 'schedule/setAuditoryType',
    }),
    onClose() {
      this.$emit('close');
    },
    onSubmit() {
      if (this.type === 'Группа') {
        this.receiveSchedules({
          group: this.groupValue.map((el) => el.ID),
        });
      }
      if (this.type === 'Преподаватель') {
        this.receiveSchedules({
          group: this.teacher.map((el) => el.ID),
          target: 'teacher',
        });
      }
      if (this.type === 'Аудитория') {
        this.receiveSchedules({
          group: this.auditory.map((el) => el.NAME),
          target: 'auditory',
        });
      }
      this.onClose();
    },
  },
  created() {

  },
};
</script>

<style lang="scss" scoped>
.v-select {
  margin: 5px 0;
}
</style>
