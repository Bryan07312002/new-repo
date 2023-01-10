<template>
  <router-link :to="to"
    class="flex mb-1 text-white items-center p-3 hover:text-[var(--dark-blue)] hover:bg-white hover:fill-[var(--dark-blue)] transition duration-200 rounded-lg fill-white">
    <component :is="icon" class="w-6 transition" />
    <p v-if="name && show_name" class="pl-3 whitespace-nowrap animate__animated animate__fadeIn">{{ name }}</p>
  </router-link>
</template>

<script setup lang="ts">
import type { RouterLink } from 'vue-router';
const props = defineProps({
  icon: {},
  name: {
    type: String,
    default: ""
  },
  show_name: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: "/"
  }
})
</script>

