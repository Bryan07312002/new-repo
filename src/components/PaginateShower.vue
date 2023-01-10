<template>
  <div class="w-full h-full p-2 max-w-[1440px] m-auto">
    <div v-if="instance" class="w-full flex items-end border-b-[1px] border-[var(--light-gray)]">
      <div v-for="field in fields" class="w-1/3 p-2 pb-1 text-[var(--gray)] ">
        {{ field }}
      </div>
    </div>
    <loding-place-holder v-if="is_loading" />
    <div v-if="instance" class="w-full h-5/6 shadow-lg rounded-lg">
      <div class="w-full flex text-[var(--dark-gray)] border-b-[1px] hover:bg-gray-100 transition hover:shadow-md"
        v-for="resource in instance.results" @click="emit('open-show', resource)">
        <div class="w-1/3 p-2 border-l-[1px] border-r-[1px]">{{ resource.data[fields[0]] }}</div>
        <div class="w-1/3 p-2 border-l-[1px] border-r-[1px]">{{ resource.data[fields[1]] }}</div>
        <div class="w-1/3 p-2 border-l-[1px] border-r-[1px]">{{ resource.data[fields[2]] }}</div>
      </div>
    </div>
    <div class="w-full flex justify-end pt-4">
      <Button @click="emit('open-create')">
        + Novo {{ model_name }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import LodingPlaceHolder from "@/components/LoadingplaceHolder.vue"
import { Paginate } from "@/api/basic_utils";

const props = defineProps({
  instance: {
    type: Paginate
  },
  fields: {
    type: Array
  },
  is_loading: {
    type: Boolean,
    default: false
  },
  model_name: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(["open-create", "open-show"]);
</script>
