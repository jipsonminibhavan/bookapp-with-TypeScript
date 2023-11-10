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
  actions: {}
})
