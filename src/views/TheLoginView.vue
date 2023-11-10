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
          name="email"
          v-model="user.password"
          type="password"
          placeholder="Enter your password!"
          rules="required"
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
        email: '',
        password: ''
      },
      success: false,
      loginError: false
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),
    async submit() {
      this.success = false
      this.loginError = false
      try {
        await this.login(this.user)
        this.success = true
      } catch (error) {
        this.loginError = true
      }
    }
  }
})
</script>

<style scoped></style>
