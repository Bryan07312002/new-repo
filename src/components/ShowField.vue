<template>
  <div v-if="show()">
    <p v-if="label" class="text-gray-600 font-semibold">{{ label }}:</p>
    <div>
      <p v-if="typeof (value) !== 'boolean'" :class="is_ml()">{{ value }}</p>
      <div :class="is_ml()" class="border-[1px] w-4 h-4 border-[var(--gray)]" v-if="typeof (value) === 'boolean'">
        <div v-if="value" class="w-full h-full bg-[var(--light-blue)]" />
        <div v-else class="w-full h-full bg-[var(--red)]" />
      </div>
    </div>
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
