<template>
  <div class="p-6">
    <input-vue />
    <select-one :value="a" :options="[{ id: 1, name: 'try' }, { id: 2, name: 'again' }]" @input="a = $event" />
    {{ a }}
  </div>
</template>

<script setup lang="ts">
import InputVue from "@/components/Input.vue";
import SelectOne from "@/components/SelectOne.vue";
import ButtonVue from "@/components/Button.vue";
import { ref } from "vue";

const a = ref(2);
</script>
