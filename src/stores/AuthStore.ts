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
      const requestBody = JSON.stringify(user)
      console.log(requestBody)

      try {
        const response = await fetch('http://localhost:4730/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        })
        if (!response.ok) {
          throw new Error('Login failed')
        }
        const data: LoginResponse = await response.json()
        console.log('Access Token:', data.accessToken)
        this.user = data.user
        this.accessToken = data.accessToken
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    }
  }
})
