<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <input class="input" type="text" v-model="searchTerm" placeholder="Search for books..." />

        <!-- searchbox -->
      </div>
    </div>

    <table class="table">
      <tbody>
        <tr v-for="book in paginatedBooks" :key="book.id">
          <td>{{ book.title }}</td>
          <td>
            <router-link :to="{ name: 'BookDetailView', params: { isbn: book.isbn } }">
              {{ book.isbn }}
            </router-link>
          </td>
          <td class="text-right">
            <!-- Flex Container for buttons -->
            <div class="flex-container">
              <button class="button button-outline" @click="toggleReadStatus(book)">
                {{ book.read ? '✔️' : 'Read' }}
              </button>
              <button class="button button-outline" @click="deleteBook(book.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Paginierungskontrollen -->
  <ul class="pagination">
    <li :class="{ disabled: currentPage === 1 }">
      <a href="#" @click="prevPage">Previous</a>
    </li>

    <li>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </li>

    <li :class="{ disabled: currentPage >= totalPages }">
      <a href="#" @click="nextPage">Next</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookListItem from '../components/BookListItem.vue'
//import http from '@/utils/http'
import type { Book } from '@/utils/model'
import { useBookStore } from '@/stores/BookStore'
import { mapStores } from 'pinia'

interface ComponentData {
  books: Book[]
  searchTerm: string
  currentPage: number
  itemsPerPage: number
}
export default defineComponent({
  name: 'BookListView',

  components: {
    BookListItem
  },
  data(): ComponentData {
    return {
      books: [],
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 15
    }
  },
  computed: {
    ...mapStores(useBookStore),
    totalPages() {
      return Math.ceil(this.booksStore.books.length / this.itemsPerPage)
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      console.log(this.currentPage)
      return this.filteredBooks.slice(start, end)
    },
    filteredBooks(): Book[] {
      if (this.searchTerm) {
        const searchTerm = this.searchTerm.toLowerCase()
        return this.booksStore.books.filter((book) => book.title.toLowerCase().includes(searchTerm))
      }
      return this.booksStore.books
    }
  },
  methods: {
    toggleReadStatus(book: Book) {
      this.booksStore.toggleReadStatus(book)
    },
    deleteBook(bookId: number) {
      this.booksStore.deleteBook(bookId)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        console.log(this.currentPage)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        console.log(this.currentPage)
      }
    }
  },
  created() {
    console.log(this.booksStore)
    this.booksStore.fetchBooks()
  }
})
</script>
<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-end;
}

.flex-container > button {
  margin-left: 10px;
}
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.pagination li {
  margin: 0 5px;
  display: flex;
  align-items: center;
}
.input {
  margin-top: 20px;
}
.pagination li span {
  margin: 0 10px;
}

.pagination li:not(:last-child):after {
  content: '|';
  margin: 0 10px;
  color: #ccc;
}

.pagination li.disabled a {
  color: #ccc;
  pointer-events: none;
  cursor: default;
}

.pagination li a {
  text-decoration: none;
}

.pagination li a:hover {
  color: #333;
}
</style>
