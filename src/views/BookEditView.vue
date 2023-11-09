<template>
  <form novalidate @submit.prevent="submit" class="container">
    <fieldset>
      <!-- Title Field -->
      <label for="title">Title</label>
      <input
        type="text"
        v-model="book.title"
        name="title"
        id="title"
        @change="validateTitle"
        :class="{ 'is-invalid': errors.title }"
      />
      <span v-if="errors.title">{{ errors.title }}</span>

      <!-- Abstract Field -->
      <label for="abstract">Abstract</label>
      <textarea
        cols="50"
        rows="10"
        v-model="book.abstract"
        name="abstract"
        id="abstract"
        @change="validateAbstract"
        :class="{ 'is-invalid': errors.abstract }"
      ></textarea>
      <span v-if="errors.abstract">{{ errors.abstract }}</span>

      <!-- Author Field -->
      <label for="author">Author</label>
      <input
        type="text"
        v-model="book.author"
        name="author"
        id="author"
        @change="validateAuthor"
        :class="{ 'is-invalid': errors.author }"
      />
      <span v-if="errors.author">{{ errors.author }}</span>
      <!-- Submit Button -->
      <button type="submit" :disabled="isInvalid" class="button-primary">Submit</button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Book } from '@/utils/model.d.ts'
import { required, minLength } from '@/utils/validation'
import { useBookStore } from '@/stores/BookStore'
import { mapStores } from 'pinia'
interface Errors {
  title: string
  abstract: string
  author: string
}

interface ComponentData {
  book: Partial<Book>
  isbn: string
  errors: {
    [P in keyof Partial<Book>]: string
  }
}

export default defineComponent({
  name: 'BookEdit',

  data(): ComponentData {
    return {
      book: {
        title: '',
        abstract: '',
        author: ''
      },
      isbn: '',
      errors: {
        title: '',
        abstract: '',
        author: ''
      }
    }
  },
  computed: {
    ...mapStores(useBookStore),

    isInvalid(): boolean {
      return Object.values(this.errors).some((error) => error !== '')
    }
  },
  methods: {
    /* async getBook(isbn: string) {
      try {
        const response = await fetch(`http://localhost:4730/books/${isbn}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.book = await response.json()
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
      }
    },*/
    async submit() {
      console.log(JSON.stringify(this.book))
      try {
        const response = await fetch(`http://localhost:4730/books/${this.isbn}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.book)
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        this.book = await response.json()
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
      }
    },
    validateTitle() {
      if (this.book.title && required(this.book.title)) {
        this.errors.title = ''
      } else {
        this.errors.title = 'Title is required'
      }
    },
    validateAbstract() {
      if (minLength(this.book.abstract ?? '', 10)) {
        this.errors.abstract = ''
      } else {
        this.errors.abstract = 'Abstract must be at least 10 characters long'
      }
    },
    validateAuthor() {
      if (this.book.author && required(this.book.author)) {
        this.errors.author = ''
      } else {
        this.errors.author = 'Author is required'
      }
    }
  },
  /* async created() {
    this.isbn = this.$route.params.isbn as string
    if (this.isbn) {
      await this.getBook(this.isbn)
    }
  }*/
  created() {
    console.log('ISBN:', this.$route.params.isbn)
    //const bookStore = useBookStore()
    //bookStore.getBook(this.$route.params.isbn)
    this.booksStore.getBook(this.$route.params.isbn as string)
  }
})
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
