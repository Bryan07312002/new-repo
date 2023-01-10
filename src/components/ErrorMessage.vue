<template>
    <div class="text-red-500 text-white font-semibold">
        <p v-for="(message, index) in messages">{{ `${index}: ${message}` }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    messages: {
        type: Object,
        default: {},
    }
})
</script>
