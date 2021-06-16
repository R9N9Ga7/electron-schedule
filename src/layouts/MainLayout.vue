<template>
  <div class="main-layout">
    <MainNav @toggle="toggle" ref="toggleMenu"/>
    <main
      class="main p-2"
      style="padding-bottom: 100px!important;"
    >
      <transition name="fade">
        <div v-if="isOpen" @click="close" class="closer"></div>
      </transition>
      <MainHeader/>
      <router-view/>
      <MainStatusBar/>
      <VNotifications v-if="$route.query.notification"/>
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import MainNav from '../components/MainNav.vue';
import MainHeader from '../components/MainHeader.vue';
import MainStatusBar from '../components/MainStatusBar.vue';
import VNotifications from './components/VNotifications.vue';

export default {
  name: 'MainLayout',
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    MainNav,
    MainHeader,
    MainStatusBar,
    VNotifications,
  },
  methods: {
    ...mapMutations({
      setSettingsWindow: 'nofitications/setSettingsWindow',
      setSettingsMaxFive: 'nofitications/setSettingsMaxFive',
      setSettingsMinTwo: 'nofitications/setSettingsMinTwo',
      setSettingsScheduleRequire: 'nofitications/setSettingsScheduleRequire',
    }),
    toggle(value) {
      this.isOpen = value;
    },
    close() {
      this.$refs.toggleMenu.toggleShowNav();
    },
    toggleShowNav() {
      this.showNav = !this.showNav;
    },
  },
  created() {
    this.setSettingsWindow(localStorage.getItem('window') || 0);
    this.setSettingsMaxFive(localStorage.getItem('max_five') || 0);
    this.setSettingsMinTwo(localStorage.getItem('min_two') || 0);
    this.setSettingsScheduleRequire(localStorage.getItem('schedule_require') || 0);
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  .main {
    margin-left: 68px;
  }
}

.closer {
  width: 100%;
  height: 100%;
  background-color: rgba(33, 33, 33, .7);
  position: fixed;
  top: 0;
  left: 0;
  // z-index: -1;
  left: 0;
}
</style>
