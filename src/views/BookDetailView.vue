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
    <a class="button button-outline" href="/">Back</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//import http from '@/utils/http'
import type { Book } from '@/utils/model.d.ts'
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
  methods: {
    /*async getBook() {
      try {
        const response = await fetch(`http://localhost:4730/books/${this.isbn}`)
        if (!response.ok) {
          console.error(response.statusText)
          return
        }
        const data: Book = await response.json()
        this.book = data
      } catch (err) {
        console.error(err)
      }
    }*/
  },

  watch: {
    '$route.params.isbn'(newVal, oldVal) {
      if (newVal) {
        this.booksStore.getBook(newVal as string)
      }
    }
  },

  created() {
    //const bookStore = useBookStore()
    //bookStore.getBook(this.$route.params.isbn)
    console.log('getBook')
    this.booksStore.getBook(this.$route.params.isbn as string)
  }
})
</script>
