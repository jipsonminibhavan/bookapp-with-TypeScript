<template>
  <tr>
    <td>
      {{ title }} | <small>{{ subtitle }}</small>
    </td>
    <td>
      <router-link :to="{ name: 'BookDetailView', params: { isbn: isbn } }">
        {{ isbn }}
      </router-link>
    </td>
    <td>
      <button class="button" @click="$emit('toggleReadBook')">
        <span v-if="read">✔️</span>
        <span v-else>Read</span>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BookListItem',
  emits: ['toggleReadBook'],
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      required: true
    },

    read: {
      type: Boolean,
      default: false
    }
  }
})
</script>
