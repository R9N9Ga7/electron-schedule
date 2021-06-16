<template>
  <div class="schedule-page">
    <div class="schedule">
      <ScheduleTools
        @showSearch="toggleShowSearchParameters"
      />
      <div class="overflow-scroll d-flex mt-5 position-relative" style="height: 75vh;">
        <div>
          <ScheduleTable/>
        </div>
      </div>
      <transition name="fade">
        <PopupWithCriteria
          v-if="showSearchParameters"
          @showSearch="toggleShowSearchParameters"
        />
      </transition>
      <transition name="fade">
        <PopupEditScheduleRow
          v-if="$route.query.edit"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ScheduleTools from '../../components/schedule_tools/ScheduleTools.vue';
import PopupWithCriteria from '../../components/popup_with_criteria/PopupWithCriteria.vue';
import ScheduleTable from '../../components/schedule_table/ScheduleTable.vue';
import PopupEditScheduleRow from '../../components/popup_edit_schedule_row/PopupEditScheduleRow.vue';

export default {
  name: 'SchedulePage',
  components: {
    ScheduleTools,
    PopupWithCriteria,
    ScheduleTable,
    PopupEditScheduleRow,
  },
  data() {
    return {
      showSearchParameters: false,
    };
  },
  methods: {
    ...mapActions({
      recieveSchedule: 'schedule/recieveSchedule',
    }),
    toggleShowSearchParameters() {
      this.showSearchParameters = !this.showSearchParameters;
    },
  },
  created() {
    this.recieveSchedule();
  },
};
</script>
