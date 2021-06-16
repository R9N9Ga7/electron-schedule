<template>
  <div>
    <div class="d-flex justify-content-end">
      <button
        @click="toggleDisplayPopupCriteria"
        class="btn btn-primary"
      >
        <i class="fas fa-filter"></i>
      </button>
    </div>
    <template
      v-if="schedules.length"
    >
      <ScheduleTable
        :schedule="getSchdule"
        :schedules="schedules"
        @selected="setActiveScheduleIndex"
      />
    </template>
    <template v-else>
      <div class="d-flex align-items-center justify-content-center w-100" style="height: 70vh;">
        <div class="border border-info rounded p-3">
          <p class="m-0">Для отображения расписания необходимо добавить параметры фильтрации</p>
        </div>
      </div>
    </template>
    <transition name="fade">
      <SchedulePopupCriteria
        @close="toggleDisplayPopupCriteria"
        v-if="showPopupCrtireria"
      />
    </transition>
    <transition name="fade">
      <SchedulePopupEdit v-if="$route.query.edit"/>
    </transition>
    <transition name="fade">
      <SchedulePopupAdd v-if="$route.query.add"/>
    </transition>
    <transition name="fade">
      <SchedulePopupMove v-if="$route.query.move"/>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ScheduleTable from './components/ScheduleTable.vue';
import SchedulePopupCriteria from './components/SchedulePopupCriteria.vue';
import SchedulePopupEdit from './components/SchedulePopupEdit.vue';
import SchedulePopupAdd from './components/SchedulePopupAdd.vue';
import SchedulePopupMove from './components/SchedulePopupMove.vue';

export default {
  name: 'SchedulePage',
  components: {
    ScheduleTable,
    SchedulePopupCriteria,
    SchedulePopupEdit,
    SchedulePopupAdd,
    SchedulePopupMove,
  },
  data() {
    return {
      showPopupCrtireria: false,
      activeScheduleIndex: 0,
    };
  },
  computed: {
    ...mapState({
      schedules: (state) => state.schedule.schedules,
    }),
    getSchdule() {
      return this.schedules[this.activeScheduleIndex];
    },
  },
  methods: {
    ...mapActions({
      receiveSchedules: 'schedule/receiveSchedules',
    }),
    toggleDisplayPopupCriteria() {
      this.showPopupCrtireria = !this.showPopupCrtireria;
    },
    setActiveScheduleIndex(value) {
      this.activeScheduleIndex = value;
    },
  },
  created() {
    // this.receiveSchedules(); // TODO
  },
};
</script>
