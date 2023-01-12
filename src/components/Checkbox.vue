<template>
  <div class="flex flex-col items-start">
    <label class="text-gray-600 font-semibold" v-if="label">
      {{ label }}:
    </label>
    <input class="w-5 border-[1px] h-[32px] pl-2 text-gray-900 border-gray-400 rounded-lg" type="checkbox"
      :value="value" @input="input($event)" :checked="value" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
    default: "",
  },
  value: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["input"])
const input = (event: Event) => emit('input', (event.target as HTMLInputElement).checked);
</script>
