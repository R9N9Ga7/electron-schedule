<template>
  <nav
    class="main-nav navbar-light p-2 shadow-sm border-end border-2 bg-white"
    :class="{ 'nav-active': showNav }"
  >
    <div class="border-bottom border-2 pb-2">
      <button
        @click="toggleShowNav"
        class="navbar-toggler btn-bars"
        type="button"
      >
        <span class="navbar-toggler-icon fs-6"></span>
      </button>
    </div>
    <transition name="fade">
      <div
        v-if="showNav"
        class="btn-group-vertical pt-2 w-100"
      >
        <!-- <button
          @click="onClickGoOut"
          class="btn btn-outline-danger"
        >Выйти</button> -->
        <router-link
          v-for="link in navLinks"
          :key="link.title"
          :to="{ name: link.name }"
          :exact="link.exact"
          class="btn btn-outline-primary my-2 overflow-hidden"
          active-class="active"
        >{{ link.title }}</router-link>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return {
      showNav: false,
      navLinks: [
        {
          title: 'Расписание',
          name: 'schedule',
          exact: true,
        },
        {
          title: 'Множественный',
          name: 'extended',
        },
        {
          title: 'Настройки',
          name: 'settings',
        },
        {
          title: 'Данные',
          name: 'data',
        },
        {
          title: 'Ошибки',
          name: 'errors',
        },
      ],
    };
  },
  watch: {
    $route() {
      this.closeNavIfOpen();
    },
  },
  methods: {
    closeNavIfOpen() {
      if (this.showNav)
        this.toggleShowNav();
    },
    toggleShowNav() {
      this.showNav = !this.showNav;
      this.$emit('toggle', this.showNav);
    },
    onClickGoOut() {
      // TODO
      localStorage.removeItem('scheduleToken');
      this.$router.push({ name: 'authorization' })
    },
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  max-width: 68px;
  width: 100%;
  height: 100vh;
  position: fixed;
  transition: max-width .3s;
  z-index: 2;
}
.nav-active {
  max-width: 200px;
}
</style>
