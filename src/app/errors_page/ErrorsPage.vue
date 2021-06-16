<template>
  <div>
    <div class="d-flex">
      <v-select
        placeholder="Группы"
        :options="groups"
        :getOptionLabel="item => item.NAME"
        label="NAME"
        :value="groupsForErrors"
        @input="setGroupsForErrors"
        :clearable="false"
        :loading="!groups.length"
        :multiple="true"
        style="min-width: 400px;"
      />
      <button @click="onSubmit" class="btn btn-primary ms-3">Проверить</button>
    </div>
    <div v-if="loading" style="height: 80vh;" class="d-flex justify-content-center align-items-center">
      <div style="width: 50px; height: 50px;" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="!errors.length && ckecked" class="mt-2 d-flex justify-content-center align-items-center" style="height: 80vh;">
      <div class="alert alert-success">
        <span>Ошибок не найдено</span>
      </div>
    </div>
    <div class="mt-2" style="height: 80vh; overflow-y: auto;">
      <div
        v-for="(item, index) in errors"
        :key="item.message + index"
        class="alert my-3"
        :class="item.type === 1 ? 'alert-danger' : 'alert-warning'"
        style="z-index: -1;"
      >
        <div>{{ item.header }}</div>
        <div>{{ item.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getGroups } from './errors.service';

export default {
  name: 'ErrorsPage',
  data() {
    return {
      groups: [],
      errors: [],
      loading: false,
      ckecked: false,
    };
  },
  computed: {
    ...mapState({
      groupsForErrors: (state) => state.nofitications.groupsForErrors,
    }),
  },
  methods: {
    ...mapMutations({
      setGroupsForErrors: 'nofitications/setGroupsForErrors',
    }),
    ...mapActions({
      recieveScheduleCheckAll: 'nofitications/recieveScheduleCheckAll',
    }),
    async onSubmit() {
      this.loading = true;
      this.errors = [];
      this.errors = await this.recieveScheduleCheckAll();
      this.ckecked = true;
      this.loading = false;
    },
  },
  async created() {
    const groups = await getGroups();
    this.groups = groups.message;
  },
};
</script>
