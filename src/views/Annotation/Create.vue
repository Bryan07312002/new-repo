<template>
  <modal-base title="Criar defeito">
    <error-message :messages="error?.message" />
    <input-vue :value="instance.data.name" @input="instance.data.name = $event" label="Name" class="mt-3" />
    <input-vue :value="instance.data.label" @input="instance.data.label = $event" label="Label" class="mt-3" />
    <select-one :value="instance.data.process" @input="instance.data.process = $event" :options="process_options"
      label="Process" class="mt-3" />
    <div class="w-full flex justify-between mt-5">
      <button-vue type="gray" class="w-5/12" @click="emit('cancel')">
        Cancelar
      </button-vue>
      <button-vue type="blue" class="w-5/12" @click="handle_create()">
        Salvar
      </button-vue>
    </div>
  </modal-base>
</template>

<script setup lang="ts">
import InputVue from '@/components/Input.vue';
import SelectOne from "@/components/SelectOne.vue"
import ButtonVue from '@/components/Button.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import AnnotationLabel from '@/api/models/annotation';
import ModalBase from "@/components/ModalBase.vue";

import { ref } from "vue";
import type { Ref } from "vue";
import type HttpError from '@/api/http_errors/http_error';

defineProps({
  process_options: {
    type: Array,
    default: []
  }
});

const emit = defineEmits(["cancel", "created"]);

const instance: Ref<AnnotationLabel> = ref(new AnnotationLabel({}));
const error: Ref<HttpError | undefined> = ref();

const handle_create = async () => {
  const response = await instance.value.create();

  if (response._tag === "Right") {
    error.value = undefined;
    return emit("created");
  }

  error.value = response.left;
}
</script>
