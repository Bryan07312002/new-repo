<template>
  <div class="w-full">
    <div class="flex justify-between m-4 pb-1 ">
      <h1 class="pt-6 font-bold text-4xl text-[var(--dark-gray)]">
        {{ $route.name }}
      </h1>

      <div class="flex items-center justify-end max-h-[60px] w-fit">
        <drop-down-user />
      </div>
    </div>
    <div class="w-11/12 h-[1px] bg-[var(--light-gray)] m-auto mt-2" />
  </div>
</template>

<script setup lang="ts">
import DropDownUser from "./DropDownUser.vue";

</script>
