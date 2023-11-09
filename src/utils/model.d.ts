export interface Book {
  id: number
  title: string
  subtitle: string
  isbn: string
  numPages?: number
  read?: boolean
  abstract?: string
  cover?: string
  author: string
}
