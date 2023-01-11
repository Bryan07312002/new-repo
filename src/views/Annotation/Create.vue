<template>
  <div class="bg-white p-6 rounded-md">
    <h2 class="font-semibold text-center pb-2">Criar defeito</h2>
    <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />
    <error-message :messages="error" />
    <input-vue :value="instance.data.name" @input="instance.data.name = $event" label="Name" class="mt-3" />
    <input-vue :value="instance.data.label" @input="instance.data.label = $event" label="Label" class="mt-3" />
    <select-one :value="instance.data.process" @input="instance.data.process" :options="process_options" label="Process"
      class="mt-3" />
    <div class="w-full flex justify-between mt-5">
      <button-vue type="red" class="w-5/12" @click="emit('cancel')">
        Cancelar
      </button-vue>
      <button-vue type="blue" class="w-5/12" @click="handle_create()">
        Salvar
      </button-vue>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputVue from '@/components/Input.vue';
import SelectOne from "@/components/SelectOne.vue"
import ButtonVue from '@/components/Button.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import AnnotationLabel, { AnnotationLabelProps } from '@/api/models/annotation';
import { ref } from "vue";

const emit = defineEmits(["cancel", "created"]);

const instance = ref(new AnnotationLabel({}));
const process_options = ref([])
const error = ref({});

const handle_create = async () => {
  const response = await instance.value.create();

  if (response.right !== undefined) {
    error.value = {};
    return emit("created");
  }

  error.value = response.left.message;
}

const get_process_list = async () => {
  const response = await AnnotationLabel.retrieve_list();

  if (response.right !== undefined) {
    process_options.value = response.right.reduce((arr: Array<Object>, process) => {
      arr.push({ id: process.id, name: process.name })
      return arr
    }, []);
  }
}
get_process_list() 
</script>
