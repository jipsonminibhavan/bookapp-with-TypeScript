<template>
  <AppNavigation />
  <BookListView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNavigation from '../components/AppNavigation.vue'
import BookListView from '../views/BookListView.vue'
export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
    BookListView
  }
})
</script>
