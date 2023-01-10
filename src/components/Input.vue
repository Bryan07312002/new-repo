<template>
    <div class="flex flex-col items-start">
        <label class="text-gray-600 font-semibold" v-if="label">
            {{ label }}:
        </label>
        <input class="border-[1px] h-[32px] pl-2 text-gray-900 border-gray-400 rounded-lg" :type="type" :value="value"
            @input="emit('input', $event.target?.value)" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
    },
    type: {
        type: String,
        default: "",
    },
    value: {
        type: String,
        default: "",
    }
})

const emit = defineEmits(["input"])
</script>
