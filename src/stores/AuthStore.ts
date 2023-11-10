import { defineStore } from 'pinia'
export type User = {
  email: string
  id: number
}

export type LoginResponse = {
  accessToken: string | null
  user: User | null
}
export const useAuthStore = defineStore('AuthStore', {
  state: () =>
    ({
      user: null as User | null,
      accessToken: '',
      isLoggedIn: false
    }) as LoginResponse,
  getters: {
    email: (state) => state.user?.email ?? '',
    isAuthenticated(): boolean {
      return !!this.email
    }
  },
  actions: {
    async login(user: { email: string; password: string }) {
      try {
        const response = await fetch('http://localhost:4730/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        if (!response.ok) {
          throw new Error('Login failed')
        }
        const data: LoginResponse = await response.json()
        this.user = data.user
        this.accessToken = data.accessToken
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    }
  }
})
