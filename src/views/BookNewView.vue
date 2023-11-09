<template>
  <p v-if="success">Successfully created new book.</p>
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
      <!-- ISBN Field -->
      <label for="isbn">ISBN</label>
      <input
        type="text"
        v-model="book.isbn"
        name="isbn"
        id="isbn"
        @change="validateISBN"
        :class="{ 'is-invalid': errors.isbn }"
      />
      <span v-if="errors.isbn">{{ errors.isbn }}</span>

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
import { mapState, mapActions } from 'pinia'

interface Errors {
  title: string
  abstract: string
  author: string
  isbn: string
}

interface ComponentData {
  book: Partial<Book>
  //success: boolean
  errors: {
    [P in keyof Partial<Book>]: string
  }
}

export default defineComponent({
  name: 'BookNew',
  data(): ComponentData {
    return {
      book: {
        title: '',
        abstract: '',
        author: '',
        isbn: ''
      } as Partial<Book>,
      errors: {
        title: '',
        abstract: '',
        author: '',
        isbn: ''
      }
    }
  },
  computed: {
    ...mapState(useBookStore, ['newBook', 'success']),

    isInvalid(): boolean {
      return Object.values(this.errors).some((error) => error !== '')
    }
  },
  methods: {
    /*async createBook() {
      let errorText = ''
      console.log(this.book)
      try {
        const response = await fetch('http://localhost:4730/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.book)
        })

        if (!response.ok) {
          errorText = await response.text()
          throw new Error('Network response was not ok')
        }

        this.success = true
        this.resetForm()
      } catch (error) {
        console.error(error)
        if (errorText) {
          console.error(errorText)
        }
        this.success = false
      }
    },*/
    ...mapActions(useBookStore, ['createBook']),

    async submit() {
      this.validateTitle()
      this.validateAbstract()
      this.validateAuthor()
      this.validateISBN()

      if (!this.isInvalid) {
        try {
          await this.createBook(this.book)
          if (this.success) {
            this.resetForm()
          }
        } catch (error) {
          console.error('An error occurred:', error)
          this.success = false
        }
      }
    },
    resetForm() {
      console.log('resetForm wird aufgerufen')
      this.book = {
        title: '',
        abstract: '',
        author: '',
        isbn: ''
      }
      this.errors = {
        title: '',
        abstract: '',
        author: '',
        isbn: ''
      }
      this.success = false
    },
    validateTitle() {
      const title = this.book.title
      if (title && required(title)) {
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
    },
    validateISBN() {
      if (!this.book.isbn || !required(this.book.isbn)) {
        this.errors.isbn = 'ISBN is required.'
      } else {
        this.errors.isbn = ''
      }
    }
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
