<template>
  <AppNavigation />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNavigation from '@/components/AppNavigation.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation
  }
})
</script>
