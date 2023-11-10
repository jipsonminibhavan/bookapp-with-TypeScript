<template>
  <div class="container">
    <form @submit.prevent="submit"></form>
    <fieldset>
      <label for="email">Email </label>
      <input id="email" v-model="user.email" type="email" placeholder="Enter your email!" />
      <span v-if="validationErrors.email">{{ validationErrors.email }}</span>
    </fieldset>
    <fieldset>
      <label for="password">Password </label>
      <input
        id="password"
        v-model="user.password"
        type="password"
        placeholder="Enter your password!"
      />
      <span v-if="validationErrors.password">{{ validationErrors.password }}</span>
    </fieldset>
    <button type="submit" class="button-primary">Login</button>
    <p v-if="success" class="message success">Successfully logged in!</p>
    <div v-if="loginError" class="message error">Login failed!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped></style>
