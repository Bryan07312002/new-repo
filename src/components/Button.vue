<template>
    <button :class="button_classes[type]">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
    type: {
        type: String,
        default: "blue"
    }
});

// const base_button_classes = "p-1 pl-2 pr-2 rounded-md transition font-semibold"
const base_button_classes = "p-1 pl-2 pr-2 rounded-md transition"

const button_classes = ref({
    "blue": `${base_button_classes} bg-[var(--dark-blue)] text-white hover:bg-white hover:text-[var(--dark-blue)]`,
    "red": `${base_button_classes} bg-[var(--red)] text-white hover:bg-white hover:text-[var(--red)]`,
})
</script>
