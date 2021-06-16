<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Аудитории"
        :options="auditories"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        v-model="auditory"
        :clearable="false"
        :loading="!auditories.length"
        style="min-width: 400px;"
      />
    </div>
    <div
      v-if="Object.keys(auditoryInfo).length !== 0"
      class="mt-4"
    >
      <hr>
      <h3>{{ auditoryInfo.NAME }}</h3>
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-inline-block m-1">
            <p>Название аудитории</p>
            <p>
              <input v-model="auditoryName" class="form-control" type="text">
            </p>
            <p>Количество мест</p>
            <p>
              <input v-model="auditoryPlaces" class="form-control" type="text">
            </p>
            <p class="m-0">Тип аудитории</p>
            <v-select
              placeholder="Тип аудитории"
              :options="auditoryTypes"
              :getOptionLabel="item => item.NAME"
              label="NAME"
              v-model="auditoryType"
              :clearable="false"
              :loading="!auditoryTypes.length"
              style="min-width: 400px;"
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
    </div>
    <div class="btn-group mt-3 d-block">
      <button
        @click="onClickUpdate"
        v-if="Object.keys(auditoryInfo).length !== 0"
        type="button"
        class="btn btn-primary"
      >Сохранить</button>
      <button @click="onClickAdd" type="button" class="btn btn-success">Добавить</button>
      <button
        @click="onClickRemove"
        v-if="Object.keys(auditoryInfo).length !== 0"
        type="button"
        class="btn btn-danger"
      >Удалить</button>
    </div>
  </div>
</template>

<script>
import {
  getAuditories,
  getAuditory,
  getAuditoryType,
  getColors,
  postAuditory,
  updateAuditory,
  deleteAuditory,
} from './services/auditory.service';
import PieChart from '../shared/components/PieChart.vue';

export default {
  name: 'AuditoryPage',
  components: {
    PieChart,
  },
  data() {
    return {
      auditories: [],
      auditory: '',
      auditoryInfo: {},
      auditoryTypes: [],
      auditoryType: '',
      auditoryName: '',
      weekColorOptions: [],
      weekColor: '',
      chartLabels: [],
      chartData: [],
      chartDataColor: [],
      auditoryPlaces: '',
    };
  },
  watch: {
    async auditory() {
      if (this.auditory.ID) {
        this.chartLabels = [];
        this.chartData = [];
        this.chartDataColor = [];
        this.auditoryInfo = {};

        const auditoryInfo = await getAuditory(this.auditory.ID);
        this.auditoryInfo = auditoryInfo.message;
        this.auditoryPlaces = this.auditoryInfo.PLACES;
        const auditoryTypes = await getAuditoryType();
        this.auditoryTypes = auditoryTypes.message;
        this.auditoryName = this.auditoryInfo.NAME;
        this.auditoryType = this.auditoryTypes.find((el) => el.NAME === this.auditoryInfo.ROOM_TYPE);
        console.log('this.auditoryInfo: ', this.auditoryInfo);

        const weekColorOptions = await getColors({ group_id: "5:88576317" });
        this.weekColorOptions = weekColorOptions.message;

        this.calcDataChart();
      }
    },
    weekColor() {
      this.calcDataChart();
    },
  },
  methods: {
    async onClickAdd() {
      const id = await postAuditory();

      const auditories = await getAuditories();
      this.auditories = auditories.message;

      const auditoryInfo = await getAuditory(id.message);
      this.auditoryInfo = auditoryInfo.message;
      const auditoryTypes = await getAuditoryType();
      this.auditoryTypes = auditoryTypes.message;
      this.auditoryName = this.auditoryInfo.NAME;
      this.auditoryType = this.auditoryTypes.find((el) => el.NAME === this.auditoryInfo.ROOM_TYPE);
      this.auditoryPlaces = this.auditoryInfo.PLACES;

      this.auditory = {
        NAME: this.auditoryName,
        ID: id.message,
      };

      const weekColorOptions = await getColors({ group_id: "5:88576317" });
      this.weekColorOptions = weekColorOptions.message;

      this.calcDataChart();
    },
    async onClickUpdate() {
      await updateAuditory(this.auditory.ID, this.auditoryName, this.auditoryPlaces, this.auditoryType.ID);
      const auditories = await getAuditories();
      this.auditories = auditories.message;
      const auditoryInfo = await getAuditory(this.auditory.ID);
      this.auditoryInfo = auditoryInfo.message;
      const auditoryTypes = await getAuditoryType();
      this.auditoryTypes = auditoryTypes.message;
      this.auditoryName = this.auditoryInfo.NAME;
      this.auditoryType = this.auditoryTypes.find((el) => el.NAME === this.auditoryInfo.ROOM_TYPE);
      this.auditoryPlaces = this.auditoryInfo.PLACES;
    },
    async onClickRemove() {
      await deleteAuditory(this.auditory.ID);
      this.chartLabels = [];
      this.chartData = [];
      this.chartDataColor = [];
      this.auditoryInfo = {};
      this.auditory = '';
      const auditories = await getAuditories();
      this.auditories = auditories.message;
    },
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
        this.auditoryInfo.hours.forEach((el) => {
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

        this.auditoryInfo.hours.forEach((el) => {
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
  },
  async created() {
    const auditories = await getAuditories();
    this.auditories = auditories.message;
  },
};
</script>
