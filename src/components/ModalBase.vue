<template>
  <div class="p-6 w-screen sm:max-w-[400px]">
    <h2 v-if="title" class="font-semibold text-center pb-2">{{ title }}</h2>
    <div v-if="title" class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "" }
})

</script>
