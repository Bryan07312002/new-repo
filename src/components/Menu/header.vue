<template>
  <div class="w-full">
    <div class="flex justify-between m-4 pb-1 ">
      <h1 class="pt-6 font-bold text-4xl text-[var(--dark-gray)]">
        {{ $route.name }}
      </h1>

      <div class="flex items-center justify-end max-h-[60px] w-fit">
        <div
          class="flex items-center justify-center aspect-square overflow-hidden rounded-full bg-blue-100 w-1/5 min-w-[50px]">
          <img class="w-full" src="@/assets/img/maxion-logo.png">
        </div>
      </div>
    </div>
    <div class="w-11/12 h-[1px] bg-[var(--light-gray)] m-auto mt-2" />
  </div>
</template>

<script setup lang="ts">

</script>
