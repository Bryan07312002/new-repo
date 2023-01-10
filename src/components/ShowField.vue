<template>
  <div v-if="show()">
    <p v-if="label" class="text-gray-600 font-semibold">{{ label }}:</p>
    <div></div>
    <p :class="is_ml()">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    defult: undefined,
  },
  value: {
    default: "Não informado"
  }
})

const show = () => {
  if (!props.label) return false;
  else if (props.label == "") return false;
  else if (props.label === null) return false;
  else return true;
}

const is_ml = () => {
  if (props.label) return "ml-3"
  else return ""
}
</script>
