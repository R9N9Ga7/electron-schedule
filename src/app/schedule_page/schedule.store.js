import { getSchedules } from './services/schedule.service';
import {
  getFilter,
} from './services/filter.service';

export default {
  namespaced: true,
  state: {
    schedules: [],
    faculty: [],
    facultyValue: '',
    department: [],
    departmentValue: '',
    course: [],
    courseValue: '',
    group: [],
    groupValue: '',

    type: '',
    teachers: [],
    teacher: '',

    auditory: '',
    auditories: [],

    auditoryTypes: [],
    auditoryType: '',
  },
  mutations: {
    setAuditoryType(state, value) {
      state.auditoryType = value;
    },
    setAuditoryTypes(state, arr) {
      state.auditoryTypes = arr;
    },
    setType(state, value) {
      state.type = value;
    },
    setAuditory(state, value) {
      state.auditory = value;
    },
    setAuditories(state, value) {
      state.auditories = value;
    },
    setSchedules(state, arr) {
      state.schedules = [];
      state.schedules = arr;
    },
    setFaculty(state, arr) {
      state.faculty = arr;
    },
    setFacultyValue(state, arr) {
      state.facultyValue = arr;
    },
    setDepartmentValue(state, arr) {
      state.departmentValue = arr;
    },
    setCourseValue(state, arr) {
      state.courseValue = arr;
    },
    setGroupValue(state, arr) {
      state.groupValue = arr;
    },
    setDepartment(state, arr) {
      state.department = arr;
    },
    setCourse(state, arr) {
      state.course = arr;
    },
    setGroup(state, arr) {
      state.group = arr;
    },
    setTeachers(state, arr) {
      state.teachers = arr;
    },
    setTeacher(state, value) {
      state.teacher = value;
    },
  },
  actions: {
    // async receiveSchedules({ commit, dispatch }, group = ['5:88576317']) {
    async receiveSchedules({ commit, dispatch }, payload) {
      console.log(payload);
      commit('nofitications/setGroups', payload.group, { root: true });
      dispatch('nofitications/recieveScheduleCheck', null, {root: true});
      const data = await getSchedules(payload.group, payload.target);
      console.log('schedule', data.message.schedules);
      commit('setSchedules', data.message.schedules);
    },
    async recieveFaculty({ commit }) {
      const data = await getFilter({
        target: 'faculty',
      });

      commit('setFaculty', data.data);
    },
    async recieveDepartment({ commit }, faculty) {
      const data = await getFilter({
        'target': 'department',
        'faculty': faculty,
      });

      commit('setDepartment', data.data);
    },
    async recieveCourse({ commit }) {
      const data = await getFilter({
        'target': 'course',
      });

      commit('setCourse', data.data);
    },
    async recieveGroup({ commit }, payload) {
      console.log(payload);
      const data = await getFilter({
        'target': 'group',
        'faculty': payload.faculty,
        'department': payload.department,
        'course': payload.course,
      });

      commit('setGroup', data.data);
    },
    async recieveTeachers({ commit }, payload) {
      const data = await getFilter({
        'target': 'teacher',
        'faculty': payload.faculty,
        'department': payload.department,
        'course': payload.course,
      });
      commit('setTeachers', data.data);
    },
    async recieveAuditories({ commit }, auditory_type) {
      const data = await getFilter({
        'target': 'auditory',
        auditory_type,
      });
      commit('setAuditories', data.data);
    },
    async recieveAuditoryTypes({ commit }) {
      const data = await getFilter({
        'target': 'auditoryType',
      });
      commit('setAuditoryTypes', data.data);
    },
    // async findSchedule({ commit }, group) {
    //   console.log(payload);
    // },
  },
};
