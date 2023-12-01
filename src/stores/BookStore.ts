import { defineStore } from 'pinia'
import type { Book } from '@/utils/model'

export type BookState = {
  books: Array<Book>
  newBook: Partial<Book>
  success?: boolean
  book?: Book | null
  isbn: string
}

export const useBookStore = defineStore('books', {
  state: (): BookState => ({
    books: [],
    newBook: {},
    isbn: '',
    success: false,
    book: null
  }),
  actions: {
    toggleReadStatus(bookToUpdate: Book) {
      const bookIndex = this.books.findIndex((book) => book.id === bookToUpdate.id)
      if (bookIndex !== -1) {
        const book = this.books[bookIndex]
        const updatedBook = {
          ...book,
          read: !book.read
        }
        this.books[bookIndex] = updatedBook
      }
    },
    async getBook(isbn: string) {
      try {
        const response = await fetch(`http://localhost:4730/books/${isbn}`)
        if (!response.ok) {
          console.error(response.statusText)
          return null
        }
        this.book = await response.json()
      } catch (err) {
        console.error(err)
      }
    },

    async fetchBooks() {
      try {
        const response = await fetch('http://localhost:4730/books')
        console.log('Response:', response)
        if (response.ok) {
          const books = await response.json()
          console.log(books)
          this.books = books
        } else {
          throw new Error('Error while fetching books')
        }
      } catch (err) {
        console.error('Failed to update books:', err)
      }
    },
    async deleteBook(bookId: number) {
      if (confirm('Are you sure you want to delete this book?'))
        try {
          const response = await fetch(`http://localhost:4730/books/${bookId}`, {
            method: 'DELETE'
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          this.books = this.books.filter((book) => book.id !== bookId)
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error)
        }
    },
    async createBook(book: Partial<Book>) {
      let errorText = ''
      try {
        const response = await fetch('http://localhost:4730/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(book)
        })

        if (!response.ok) {
          errorText = await response.text()
          throw new Error('Network response was not ok')
        }
        const newBook: Book = await response.json()
        this.success = true
        this.books.push(newBook)
      } catch (error) {
        console.error(error)
        this.success = false
      }
    }
  }
})
