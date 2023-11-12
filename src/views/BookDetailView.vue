<template>
  <div v-if="booksStore.book" class="container">
    <h2>
      {{ booksStore.book.title }} (<router-link
        v-if="isbn"
        :to="{ name: 'BookEditView', params: { isbn: isbn } }"
        >Edit</router-link
      >)
    </h2>
    <p>{{ booksStore.book.abstract }}</p>
    <img :src="booksStore.book.cover" />
    <router-link class="button button-outline" to="/">Back</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'BookDetailView',

  data() {
    return {
      isbn: '' as string | string[]
    }
  },
  computed: {
    ...mapStores(useBookStore)
  },
  methods: {},

  watch: {
    '$route.params.isbn'(newVal, oldVal) {
      if (newVal) {
        this.booksStore.getBook(newVal as string)
      }
    }
  },

  created() {
    console.log('getBook')
    this.booksStore.getBook(this.$route.params.isbn as string)
  }
})
</script>
