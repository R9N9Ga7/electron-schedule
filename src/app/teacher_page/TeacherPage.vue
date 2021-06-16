<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Преподаватель"
        :options="teachers"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        v-model="teacher"
        :clearable="false"
        :loading="!teachers.length"
        style="min-width: 400px;"
      />
    </div>
    <div
      v-if="Object.keys(teacherInfo).length !== 0"
      class="mt-4"
    >
      <hr>
      <h3>{{ teacherInfo.NAME }}</h3>
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-inline-block m-1">
            <p class="m-0">ФИО</p>
            <input
              type="text"
              class="form-control d-inline-block"
              v-model="teacherName"
              style="width: 300px;"
            >
          </div>
          <div class="d-inline-block m-1">
            <p class="m-0">Кафедры</p>
            <v-select
              placeholder="Кафедры"
              :options="departments"
              :getOptionLabel="item => item.NAME"
              label="NAME"
              v-model="department"
              :clearable="false"
              :loading="!departments.length"
              style="min-width: 400px;"
              :multiple="true"
            />
          </div>
        </div>
        <div style="width: 30%;">
          <h5 class="mb-1">Количество часов</h5>
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
  getTeachers,
  getTeacher,
  getDepartments,
  postTeacherUpdate,
  getColors,
} from './services/teachers.service';
import PieChart from '../shared/components/PieChart.vue';

export default {
  name: 'TeacherPage',
  components: {
    PieChart,
  },
  data() {
    return {
      teachers: [],
      teacher: '',
      teacherName: '',
      teacherInfo: {},
      departments: [],
      department: [],
      weekColorOptions: [],
      weekColor: '',
      chartLabels: [],
      chartData: [],
      chartDataColor: [],
    };
  },
  watch: {
    async teacher() {
      if (this.teacher.ID) {
        this.chartLabels = [];
        this.chartData = [];
        this.chartDataColor = [];
        this.teacherInfo = {};

        const teacherInfo = await getTeacher(this.teacher.ID);
        this.teacherInfo = teacherInfo.message;
        this.teacherName = this.teacherInfo.NAME;

        const weekColorOptions = await getColors({ group_id: "5:88576317" });
        this.weekColorOptions = weekColorOptions.message;

        this.calcDataChart();
      }
      console.log('teacher: ', this.teacher);
      console.log('this.teacherInfo: ', this.teacherInfo);
    },
    async teacherInfo() {
      if (this.teacherInfo.ID) {
        const departments = await getDepartments();
        this.departments = departments.message;
        this.department = this.departments.find((el) => el.ID === this.teacherInfo.DEPARTMENT_ID);
        this.department = this.teacherInfo.DEPARTMENTS.map((el) => {
          return {
            NAME: el.NAME,
            ID: el.OID,
          };
        });
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

        this.chartLabels = this.weekColorOptions.map((el) => {
          this.chartDataColor.push(colors[el.NAME]);
          return el.NAME
        });

        const disciplineCountArr = [0, 0, 0];
        this.teacherInfo.hours.forEach((el) => {
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

        this.teacherInfo.hours.forEach((el) => {
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
      await postTeacherUpdate({
        teacher_id: this.teacherInfo.ID,
        name: this.teacherName,
        departments: this.department.map((el) => el.ID),
      });

      const teacherInfo = await getTeacher(this.teacher.ID);
      this.teacherInfo = teacherInfo.message;
      this.teacherName = this.teacherInfo.NAME;
    },
  },
  async created() {
    const teachers = await getTeachers();
    this.teachers = teachers.message;
  },
};
</script>
