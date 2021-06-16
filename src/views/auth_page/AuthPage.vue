<template>
  <div class="auth-page mx-auto">
    <form
      @submit.prevent="send"
      class="row g-3 p-2 shadow-sm rounded-3"
    >
      <div class="mb-3">
        <input
          v-model="login"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': loginError }"
          placeholder="Логин"
          required
        >
        <input
          v-model="password"
          type="password"
          class="form-control mt-2"
          :class="{ 'is-invalid': passwordError }"
          placeholder="Пароль"
          required
        >
        <div class="form-check mt-2">
          <input
            v-model="remember"
            class="form-check-input"
            type="checkbox"
            id="invalidCheck"
          >
          <label class="form-check-label" for="invalidCheck">
            Запомнить
          </label>
        </div>
        <button class="btn btn-primary mt-2" type="submit">Вход</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AuthPage',
  data() {
    return {
      login: '',
      password: '',
      remember: false,
    };
  },
  computed: {
    ...mapState({
      loginError: state => state.authorization.loginError,
      passwordError: state => state.authorization.passwordError,
    }),
  },
  methods: {
    async auth() {
      const body = {
        login: this.login,
        password: this.password,
      };
      try {
        const response = await fetch('http://185.68.21.151:8080/auth', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async send() {
      const token = await this.auth();
      if (!!token.message) {
        localStorage.setItem('scheduleToken', token.message);
        this.$router.push({ name: 'schedule' });
      }
      // console.log(this.remember);
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-page {
  width: 250px;
  margin-top: 20%;
}
</style>
