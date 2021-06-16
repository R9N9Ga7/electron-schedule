<template>
  <div>
    <div v-if="showInfo" class="alert alert-info d-flex justify-content-between" role="alert">
      <span>Дисциплины относятся к учебным планам, изменение этих данных может вызвать большое количество проблем, поэтому изменение данных не предоставляется</span>
      <p><button @click="showInfo = false" class="btn btn-info py-1 ms-3">X</button></p>
    </div>
    <div class="d-flex">
      <v-select
        placeholder="Дисциплины"
        :options="disciplines"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        v-model="discipline"
        :clearable="false"
        :loading="!disciplines.length"
        style="min-width: 400px;"
      />
    </div>
    <div
      v-if="Object.keys(disciplineInfo).length !== 0"
      class="mt-4"
    >
      <hr>
      <h3>{{ disciplineInfo.NAME }}</h3>
      <div class="m-1">
        <p class="m-0"><strong>Часы</strong> {{ hours }}</p>
      </div>
      <div class="d-inline-block m-1">
        <p class="m-0">Группы</p>
        <v-select
          placeholder="Группы"
          :options="disciplineInfo.GROUPS"
          :getOptionLabel="item => item.NAME"
          label="NAME"
          v-model="group"
          :clearable="false"
          :loading="!disciplineInfo.GROUPS.length"
          style="min-width: 400px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDisciplines,
  getDiscipline,
  getDisciplineHours,
} from './discipline.service';

import getSemesters from '../shared/services/get_semesters.service';

export default {
  name: 'DisciplinePage',
  data() {
    return {
      disciplines: [],
      discipline: '',
      disciplineInfo: {},
      semesters: [],
      semester: '',
      showInfo: true,
      group: '',
      groupHours: '',
    };
  },
  computed: {
    hours() {
      if (this.group.ID) {
        return this.groupHours ? this.groupHours : '0';
      }
      return this.disciplineInfo.hours;
    },
  },
  watch: {
    async discipline() {
      if (this.discipline.ID) {
        const disciplineInfo = await getDiscipline({
          discipline_id: this.discipline.ID,
        });
        this.disciplineInfo = disciplineInfo.message;
      }
    },
    async group() {
      if (this.group.ID) {
        const hours = await getDisciplineHours(this.discipline.ID, this.group.ID);
        this.groupHours = hours.message;
        console.log(this.groupHours);
      }
    },
  },
  async created() {
    const disciplines = await getDisciplines();
    this.disciplines = disciplines.message;

    const semesters = await getSemesters();
    this.semesters = semesters.message;
  },
};
</script>
