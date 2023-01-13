<template>
    <div class="flex flex-col items-start">
        <input id="file-upload-btn" class="border-none h-[32px] pl-2 text-gray-900 border-gray-400 rounded-lg w-full" hidden :type="type" :value="value"
            @input="emit('input', $event.target?.value)" />
        <label class="text-[var(--dark-blue)] w-full font-semibold bg-white py-1.5 px-2.5 rounded-md outline outline-offset-[-2px] outline-1 outline-[var(--dark-blue)] text-center cursor-pointer" v-if="label" for="file-upload-btn">
            {{ label }}
        </label>
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
<style>


</style>