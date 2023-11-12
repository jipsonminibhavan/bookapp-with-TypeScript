<template>
  <AppNavigation />
  <router-view v-if="isAuthenticated" />
  <TheLoginView v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNavigation from '@/components/AppNavigation.vue'
import TheLoginView from '@/views/TheLoginView.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { mapState } from 'pinia'

export default defineComponent({
  name: 'HomeView',
  components: {
    AppNavigation,
    TheLoginView
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated'])
  }
})
</script>
