<template>
  <footer
    class="fixed-bottom bg-white border-top border-2 py-1 px-3 d-flex justify-content-end"
  >
    <router-link v-if="notification.length" class="mx-2 text-danger" :to="{ query: { notification: true } }">
      <i class="fas fa-exclamation-triangle"></i>
    </router-link>
    <router-link v-else class="mx-2" :to="{ query: {} }">
      <i class="fas fa-check"></i>
    </router-link>
    <button
      @click="onClickCheckDB"
      class="mx-2 btn p-0"
      :class="dbConnection ? 'text-primary' : 'text-danger'"
    >
      <i class="fas fa-database"></i>
    </button>
  </footer>
</template>

<script>
import { mapState } from 'vuex';
import { API_URL } from '../consts';
import authHeader from '../app/shared/utils/auth_header';

export default {
  name: 'MainStatusBar',
  data() {
    return {
      dbConnection: true,
    };
  },
  computed: {
    ...mapState({
      notification: (state) => state.nofitications.notification,
    })
  },
  methods: {
    async onClickCheckDB() {
      try {
        const response = await fetch(`${API_URL}/settings/connection/`, {
          headers: authHeader,
        });
        const json = await response.json();
        this.dbConnection = json.message;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
