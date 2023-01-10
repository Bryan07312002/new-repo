<template>
  <div class="h-full bg-[var(--dark-blue)] p-2 transition">
    <div
      class="flex mb-1 items-center p-3 hover:text-[var(--dark-blue)] hover:bg-white hover:fill-[var(--dark-blue)] transition duration-200 rounded-lg fill-white"
      @click="open()">
      <MenuIcon class="w-6" />
    </div>
    <side-bar-button to="/" :icon="ChartPieIcon" name="Dashboard" :show_name="is_open" />
    <side-bar-button to="/" :icon="WheelIcon" name="Modelos de rodas" :show_name="is_open" />
    <side-bar-button to="/users" :icon="UserIcon" name="Usuários" :show_name="is_open" />
    <side-bar-button to="/" :icon="HandShakeIcon" name="Padrões de qualidade" :show_name="is_open" />
    <side-bar-button to="/alerts" :icon="HandShakeIcon" name="Alertas" :show_name="is_open" />
  </div>
</template>

<script setup lang="ts">
import SideBarButton from "./SideBarButton.vue";
import MenuIcon from "@/assets/icons/Menuicon.vue";
import ChartPieIcon from "@/assets/icons/ChartPieIcon.vue";
import WheelIcon from "@/assets/icons/WheelIcon.vue";
import UserIcon from "@/assets/icons/UserIcon.vue";
import HandShakeIcon from "@/assets/icons/HandShakeIcon.vue";

import { ref } from "vue";

const is_open = ref(false);

const open = () => {
  console.log(is_open.value)
  is_open.value = !is_open.value;
}
</script>
