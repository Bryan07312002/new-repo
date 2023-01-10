<template>
  <div class="flex w-screen h-screen">
    <sidebar />
    <main class="w-full flex flex-col overflow-auto">
      <header-menu />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./sidebar.vue";
import HeaderMenu from "./header.vue";
</script>
