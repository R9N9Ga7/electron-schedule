<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Группы"
        :options="groups"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        v-model="group"
        :clearable="false"
        :loading="!groups.length"
        style="min-width: 400px;"
      />
    </div>
    <div
      v-if="Object.keys(groupInfo).length !== 0"
      class="mt-4"
    >
      <hr>
      <h3>{{ groupInfo.NAME }}</h3>
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-inline-block m-1">
            <p class="m-0">Название группы</p>
            <input
              type="text"
              class="form-control d-inline-block"
              v-model="groupName"
              style="width: 300px;"
            >
          </div>
          <div class="d-inline-block m-1">
            <p class="m-0">Кафедра</p>
            <v-select
              placeholder="Кафедра"
              :options="departments"
              :getOptionLabel="item => item.NAME"
              label="NAME"
              v-model="department"
              :clearable="false"
              :loading="!departments.length"
              style="min-width: 300px;"
            />
          </div>
          <div class="d-inline-block m-1">
            <p class="m-0">Курс</p>
            <v-select
              placeholder="Курс"
              :options="courses"
              :getOptionLabel="item => item.NAME"
              label="NAME"
              v-model="course"
              :clearable="false"
              :loading="!courses.length"
              style="min-width: 300px;"
            />
          </div>
        </div>
        <div style="width: 30%;">
          <h5 class="mb-1">Количество пар</h5>
          <v-select
            placeholder="Неделя"
            :options="weekColorOptions"
            :getOptionLabel="item => item.NAME"
            label="NAME"
            v-model="weekColor"
            :clearable="false"
            :loading="!weekColorOptions.length"
            style="min-width: 300px;"
          />
          <PieChart
            v-if="chartLabels.length"
            :chartLabels="chartLabels"
            :chartData="chartData"
            :key="`pie-chart-key${weekColor.ID}`"
            :chartDataColor="chartDataColor"
            class="mt-1"
          />
        </div>
      </div>
      <div class="btn-group mt-3 d-block">
        <button @click="onClickSubmit" type="button" class="btn btn-primary">Сохранить</button>
        <!-- <button type="button" class="btn btn-danger">Удалить</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGroups,
  getGroup,
  getCourse,
  postGroupUpdate,
  getColors,
} from './services/group.service';
import { getFilter } from './services/filter.service';
import PieChart from '../shared/components/PieChart.vue';

export default {
  name: 'GroupPage',
  components: {
    PieChart,
  },
  data() {
    return {
      groups: [],
      group: '',
      groupInfo: {},
      groupName: '',
      faculties: [],
      faculty: '',
      departments: [],
      department: '',
      courses: [],
      course: '',
      weekColorOptions: [],
      weekColor: '',
      chartLabels: [],
      chartData: [],
      chartDataColor: [],
    };
  },
  watch: {
    async group() {
      if (this.group.ID) {
        this.chartLabels = [];
        this.chartData = [];
        this.chartDataColor = [];
        this.groupInfo = {};

        const groupInfo = await getGroup(this.group.ID);
        this.groupInfo = groupInfo.message;
        this.groupName = this.groupInfo.NAME;

        const weekColorOptions = await getColors({ group_id: this.group.ID });
        this.weekColorOptions = weekColorOptions.message;

        this.calcDataChart();
      }
    },
    async groupInfo() {
      if (this.groupInfo.ID) {
        const faculties = await getFilter({
          target: 'faculty',
        });
        this.faculties = faculties.data;
        this.faculty = this.faculties.find((el) => el.ID === this.groupInfo.FACULTY);

        const courses = await getCourse();
        this.courses = courses.data;
        this.course = this.courses.find((el) => el.ID === this.groupInfo.COURSE_REF);
      }
    },
    async faculty() {
      if (this.faculty.ID) {
        const departments = await getFilter({
          target: 'department',
          'faculty': this.faculty.ID,
        });
        this.departments = departments.data;
        this.department = this.departments.find((el) => el.ID === this.groupInfo.DEPARTMENT);
      }
    },
    weekColor() {
      this.calcDataChart();
    },
  },
  methods: {
    calcDataChart() {
      const colors = {
        'Всегда': 'rgba(255, 255, 78, .4)',
        'Белая': 'rgb(245, 245, 245)',
        'Зеленая': 'rgba(19, 255, 78, .4)',
        'Белая нечетная': 'rgba(244, 255, 199, 1)',
        'Зеленая нечетная': 'rgba(26, 227, 155, 1)',
        'Белая четная': 'rgba(175, 186, 154, 1)',
        'Зеленая четная': 'rgba(69, 186, 154, 1)',
      };

      if (!this.weekColor) {

        this.weekColorOptions.forEach((el) => {
          this.chartDataColor.push(colors[el.NAME]);
        });

        this.chartLabels = ['Всегда', 'Белая', 'Зеленая'];

        const disciplineCountArr = [0, 0, 0];
        this.groupInfo.hours.forEach((el) => {
          if (el.colorName === 'Всегда') {
            el.hours.forEach((elem) => {
              disciplineCountArr[0] += elem.hours;
            });
            return;
          }
          if (el.colorName === 'Белая') {
            el.hours.forEach((elem) => {
              disciplineCountArr[1] += elem.hours;
            });
            return;
          }
          if (el.colorName === 'Зеленая') {
            el.hours.forEach((elem) => {
              disciplineCountArr[2] += elem.hours;
            });
            return;
          }
        });
        this.chartData = disciplineCountArr;
      } else {
        const chartLabels = [];
        const chartData = [];

        this.groupInfo.hours.forEach((el) => {
          if (el.colorName === 'Всегда' && this.weekColor.NAME === 'Всегда') {
            el.hours.forEach((elem) => {
              const keys = elem.disciplineName;
              const values = elem.hours;

              chartLabels.push(keys);
              chartData.push(values);
            });
          }
          if (el.colorName === 'Белая' && this.weekColor.NAME === 'Белая') {
            el.hours.forEach((elem) => {
              const keys = elem.disciplineName;
              const values = elem.hours;

              chartLabels.push(keys);
              chartData.push(values);
            });
          }
          if (el.colorName === 'Зеленая' && this.weekColor.NAME === 'Зеленая') {
            el.hours.forEach((elem) => {
              const keys = elem.disciplineName;
              const values = elem.hours;

              chartLabels.push(keys);
              chartData.push(values);
            });
          }
        });

        this.chartLabels = chartLabels;
        this.chartData = chartData;
        this.chartDataColor = chartData.map((el) => {
          return `rgba(${this.getRandomInt(255)}, ${this.getRandomInt(255)}, ${this.getRandomInt(255)}, ${Math.random()})`;
        });
      }

    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    async onClickSubmit() {
      await postGroupUpdate({
        group_id: this.groupInfo.ID,
        name: this.groupName,
        department_id: this.department.ID,
        course: this.course.ID,
      });

      const groupInfo = await getGroup(this.group.ID);
      this.groupInfo = groupInfo.message[0];
      this.groupName = this.groupInfo.NAME;
    },
  },
  async created() {
    const groups = await getGroups();
    this.groups = groups.message;
  },
};
</script>
