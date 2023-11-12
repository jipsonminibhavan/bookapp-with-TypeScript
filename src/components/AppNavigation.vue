<template>
  <nav class="navigation">
    <div class="nav-section left">
      <router-link to="/books" class="button button-clear">Books</router-link>
      <router-link to="/about" class="button button-clear">About</router-link>
      <router-link to="/books/create" class="button button-clear">New Book</router-link>
    </div>
    <div class="nav-section right">
      <ul v-if="isAuthenticated" class="menu">
        <li><button class="button button-clear" @click="handleLogout">Logout</button></li>
      </ul>
      <ul v-else class="menu">
        <li>
          <router-link to="/login" class="button button-clear">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { mapState, mapActions } from 'pinia'

export default defineComponent({
  name: 'AppNavigation',
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    handleLogout() {
      this.logout()

      this.$router.push({ name: 'TheLoginView' })
    },
    testClick() {
      console.log('Link clicked')
    }
  },
  created() {
    console.log('AppNavigation created')
  },
  mounted() {
    console.log('AppNavigation mounted')
  }
})
</script>
<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.nav-section.left {
  display: flex;
}

.nav-section.right {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

.button {
  margin-left: 10px;
}

.button-clear {
  border: none;
  padding: 10px 20px;
}
</style>
