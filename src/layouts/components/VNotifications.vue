<template>
  <div class="notifications shadow bg-white rounded p-2">
    <div class="d-flex justify-content-end">
      <button @click="onClickClose" class="btn btn-danger">X</button>
    </div>
    <div
      class="h-100 mt-2 p-1 pb-5"
      style="overflow-y: scroll;"
    >
      <div
        v-for="item in notification"
        :key="item.message"
        class="alert"
        :class="item.type === 1 ? 'alert-danger' : 'alert-warning'"
      >
        <div>{{ item.header }}</div>
        <div>{{ item.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'VNotifications',
  computed: {
    ...mapState({
      notification: (state) => state.nofitications.notification,
    })
  },
  methods: {
    onClickClose() {
      this.$router.push({ query: {} })
    },
  },
};
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  right: 10px;
  bottom: 40px;
  width: 360px;
  height: 300px;
  overflow: hidden;
}
</style>
