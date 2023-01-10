<template>
  <div class="w-full h-full p-2 max-w-[1440px] m-auto">
    <div v-if="instance" class="w-full flex items-end border-b-[1px] border-[var(--light-gray)]">
      <div v-for="field in fields" class="w-1/3 p-2 pb-1 text-[var(--gray)] ">
        {{ field }}
      </div>
    </div>
    <loding-place-holder v-if="is_loading && loading" />
    <div v-if="instance" class="w-full shadow-lg rounded-lg">
      <div class="w-full flex text-[var(--dark-gray)] border-b-[1px] hover:bg-gray-100 transition hover:shadow-md"
        v-for="resource in instance.results" @click="emit('open-show', resource)">
        <div class="w-1/3 p-2 border-l-[1px] border-r-[1px]">{{ resource.data[fields[0]] }}</div>
        <div class="w-1/3 p-2 border-l-[1px] border-r-[1px]">{{ resource.data[fields[1]] }}</div>
        <div class="w-1/3 p-2 border-l-[1px] border-r-[1px]">{{ resource.data[fields[2]] }}</div>
      </div>
    </div>
    <div class="flex justify-center items-center w-full p-2">
      <button-vue class="mx-4" @click="previous()" v-if="instance?.previous">Prev</button-vue>
      <div v-if="instance" class="text-[var(--dark-gray)] font-bold">{{ instance?.page_number() }}</div>
      <button-vue class="mx-4" @click="next()" v-if="instance?.next">Next</button-vue>
    </div>
    <div class="w-full flex justify-end pt-4">
      <button-vue @click="emit('open-create')">
        + Novo {{ model_name }}
      </button-vue>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonVue from "@/components/Button.vue";
import LodingPlaceHolder from "@/components/LoadingPlaceHolder.vue";
import { Paginate } from "@/api/basic_utils";
import { ref } from "vue";

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
const emit = defineEmits(["open-create", "open-show", "change_page"]);
const loading = ref(false);

const next = async () => {
  loading.value = true;
  if (!props.instance) return

  const next_page = await props.instance.next_page();
  if (next_page?.right !== undefined) return emit("change_page", next_page.right);
  loading.value = false;
}

const previous = async () => {
  loading.value = true;
  if (!props.instance) return

  const next_page = await props.instance.previous_page();
  if (next_page?.right !== undefined) return emit("change_page", next_page.right);
  loading.value = false;
}

</script>
