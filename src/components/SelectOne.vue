<template>
  <div>
    <label class="text-gray-600 font-semibold" v-if="label">
      {{ label }}:
    </label>
    <select @input="input($event)" :value="value"
      class="border-[1px] h-[32px] w-full pl-2 text-gray-700 border-gray-400 rounded-lg bg-white">
      <option v-for="option in  options" :value="option.id" :key="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
  },
  options: {
    type: Array,
    default: []
  },
  value: {}
})

const emit = defineEmits(["input"]);
const input = (event: Event) => emit('input', (event.target as HTMLInputElement).value);
</script>
