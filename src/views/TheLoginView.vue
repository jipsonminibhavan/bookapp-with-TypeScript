<template>
  <div class="container">
    <form @submit.prevent="submit">
      <fieldset>
        <label for="email">Email </label>
        <Field
          id="email"
          name="email"
          v-model="user.email"
          rules="required|email"
          type="email"
          placeholder="Enter your email!"
        />
        <ErrorMessage name="email" />
      </fieldset>
      <fieldset>
        <label for="password">Password </label>
        <Field
          id="password"
          name="password"
          v-model="user.password"
          type="password"
          placeholder="Enter your password!"
          rules="required|min:6"
        />
        <ErrorMessage name="password" />
      </fieldset>
      <button type="submit" class="button-primary">Login</button>
    </form>

    <p v-if="success" class="message success">Successfully logged in!</p>
    <div v-if="loginError" class="message error">Login failed!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { mapActions } from 'pinia'
import { Form, Field, ErrorMessage } from 'vee-validate'

type ComponentData = {
  user: {
    email: string
    password: string
  }
  success: boolean
  loginError: boolean
}

export default defineComponent({
  name: 'Login',
  data(): ComponentData {
    return {
      user: {
        email: '', // 'admin@bookmonkey.api'
        password: '' // 'password1!'
      },
      success: false,
      loginError: false
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),
    async submit() {
      console.log('User Input:', this.user)
      this.success = false
      this.loginError = false
      try {
        await this.login(this.user)
        console.log('Login successful')
        this.success = true
      } catch (error) {
        console.error('Login failed:', error)
        this.loginError = true
      }
    }
  },
  created() {
    console.log('TheLoginView created')
  }
})
</script>

<style scoped></style>
