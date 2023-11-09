<template>
  <ul>
    <li><router-link to="/books">Books</router-link></li>
    <li><router-link to="/about">About</router-link></li>
    <li><router-link to="/books/create"> New Book</router-link></li>
    <li><router-link to="/login"> Login</router-link></li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppNavigation'
})
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
}

li {
  float: left;
}

a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

a:hover:not(.active) {
  background-color: #111111;
}

a.active {
  background-color: #4caf50;
}
</style>
