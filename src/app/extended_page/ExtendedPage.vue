<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Группа"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        :options="groups"
        :clearable="false"
        v-model="group"
        :loading="!groups.length"
        multiple
        style="min-width: 200px;"
      />
      <v-select
        v-if="group.length"
        placeholder="Дисциплина"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        :options="disciplines"
        :clearable="false"
        :value="discipline"
        @input="setDiscipline"
        :loading="!disciplines.length"
        style="min-width: 300px;"
        class="ms-3"
      />
    </div>
    <div>
      <ScheduleTable
        v-if="schedules.length"
        :schedule="schedules[0]"
        :group="group"
        :key="key"
      />
    </div>
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
import { mapActions, mapState, mapMutations } from 'vuex';
import ScheduleTable from './components/ScheduleTable.vue';
import SchedulePopupEdit from './components/SchedulePopupEdit.vue';
import SchedulePopupAdd from './components/SchedulePopupAdd.vue';
import SchedulePopupMove from './components/SchedulePopupMove.vue';
import getGroups from './services/get_groups.service';
import getDisciplines from './services/get_disciplines.service';

export default {
  name: 'ExtendedPage',
  components: {
    ScheduleTable,
    SchedulePopupEdit,
    SchedulePopupAdd,
    SchedulePopupMove,
  },
  data() {
    return {
      group: [],
      groups: [],
      // discipline: '',
      disciplines: [],
    };
  },
  computed: {
    ...mapState({
      schedules: (state) => state.extended.schedules,
      discipline: (state) => state.extended.discipline,
      key: (state) => state.extended.key,
    }),
  },
  watch: {
    async group() {
      if (this.group.length) {
        this.disciplines = [];
        this.setDiscipline('');
        const groups = this.group.map((el) => el.ID);
        const disciplines = await getDisciplines(groups);
        this.disciplines = disciplines.message;
        this.recieveSchedule(this.group.map((el) => el.ID));
      } else {
        this.setSchedules([]);
      }
    },
    async discipline() {
      if (this.discipline.ID) {
        this.recieveSchedule(this.group.map((el) => el.ID));
      }
    },
  },
  methods: {
    ...mapActions({
      recieveSchedule: 'extended/recieveSchedule',
    }),
    ...mapMutations({
      setDiscipline: 'extended/setDiscipline',
      setSchedules: 'extended/setSchedules',
    }),
  },
  async created() {
    const groups = await getGroups();
    this.groups = groups.message;
  },
};
</script>
