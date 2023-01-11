<template>
  <div class="p-6">
    <h2 class="font-semibold text-center pb-2">Deletar {{ model_name }}</h2>
    <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />
    <error-message :messages="error?.message" />
    <p class="p-4">Deseja mesmo excluir {{ model_name }} <b>{{ resource.data[props.field] }}</b>?</p>
    <div class="flex justify-between mt-3">
      <button-vue type="red" class="w-5/12" @click="emit('cancel')">
        Cancelar
      </button-vue>
      <button-vue class="w-5/12" @click="handle_delete()">
        Excluir
      </button-vue>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonVue from "@/components/Button.vue";
import ErrorMessage from "./ErrorMessage.vue";
import { ref } from "vue";

const props = defineProps({
  resource: {
    type: Object,
    default: {},
  },
  model_name: {
    type: String,
    default: ""
  },
  field: {
    type: String,
    default: "",
  }
});
const emit = defineEmits(["cancel", "deleted"]);

const error = ref();

const handle_delete = async () => {
  const response = await props.resource.delete();

  if (response.right !== undefined) {
    return emit("deleted");
  }

  error.value = response
}
</script>
