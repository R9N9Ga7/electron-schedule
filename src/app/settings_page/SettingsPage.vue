<template>
  <div>
    <div>
      <h3>Настройки расписания</h3>
      <p>Выберите семестр</p>
      <v-select
        style="max-width: 200px;"
        placeholder="Семестр"
        label="NAME"
        :options="semesters"
        :clearable="false"
        v-model="selectedSemester"
      />
    </div>
    <div class="mt-4">
      <h3>Настройки проверки</h3>
      <div class="form-check form-switch">
        <input
          @input="toggleSettingsWindow"
          :value="window"
          :checked="window == 1"
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault1"
        >
        <label class="form-check-label" for="flexSwitchCheckDefault1">У групп нет окон</label>
      </div>
      <div class="form-check form-switch">
        <input
          @input="toggleSettingsMaxFive"
          :value="max_five"
          :checked="max_five == 1"
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault2"
        >
        <label class="form-check-label" for="flexSwitchCheckDefault2">У групп максимум 5 пар в день</label>
      </div>
      <div class="form-check form-switch">
        <input
          @input="toggleSettingsMinTwo"
          :value="min_two"
          :checked="min_two == 1"
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault3"
        >
        <label class="form-check-label" for="flexSwitchCheckDefault3">У групп минимум 2 пары в день</label>
      </div>
      <div class="form-check form-switch">
        <input
          @input="toggleSettingsScheduleRequire"
          :value="schedule_require"
          :checked="schedule_require == 1"
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault4"
        >
        <label class="form-check-label" for="flexSwitchCheckDefault4">У групп должно быть расписание</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getSemester, setSemester } from '../shared/utils/semester.util';

export default {
  name: 'SettingsPage',
  data() {
    return {
      selectedSemester: '',
    };
  },
  computed: {
    ...mapState({
      semesters: (state) => state.settings.semesters,
      window: (state) => state.nofitications.settings.window,
      max_five: (state) => state.nofitications.settings.max_five,
      min_two: (state) => state.nofitications.settings.min_two,
      schedule_require: (state) => state.nofitications.settings.schedule_require,
    }),
  },
  watch: {
    selectedSemester(value) {
      setSemester(value);
    },
  },
  methods: {
    ...mapActions({
      recieveSemesters: 'settings/recieveSemesters',
    }),
    ...mapMutations({
      toggleSettingsWindow: 'nofitications/toggleSettingsWindow',
      toggleSettingsMaxFive: 'nofitications/toggleSettingsMaxFive',
      toggleSettingsMinTwo: 'nofitications/toggleSettingsMinTwo',
      toggleSettingsScheduleRequire: 'nofitications/toggleSettingsScheduleRequire',
    }),
  },
  created() {
    this.recieveSemesters();
    this.selectedSemester = getSemester() || '';
  },
};
</script>
