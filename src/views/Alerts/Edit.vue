<template>
  <modal-base title="Criar alerta">
    <error-message :messages="error?.message" />

    <input-vue class="mt-3" label="Limit" :value="instance.data.limit" @input="instance.data.limit = $event"
      type="number" />

    <input-vue class="mt-3" label="Time_interval" :value="instance.data.time_interval"
      @input="instance.data.time_interval = $event" type="number" />

    <Checkbox class="mt-3" label="Eneabled" :value="instance.data.enabled" @input="instance.data.enabled = $event" />

    <select-one class="mt-3" label="Area" :value="instance.data.area" :options="areas_options"
      @input="instance.data.area = $event" />

    <select-one class="mt-3" label="Defeito" :value="instance.data.label" :options="annotation_options"
      @input="instance.data.label = $event" />

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
import InputVue from "@/components/Input.vue";
import SelectOne from "@/components/SelectOne.vue";
import Checkbox from "@/components/Checkbox.vue";
import ButtonVue from "@/components/Button.vue";
import ModalBase from "@/components/ModalBase.vue";
import Alert from "@/api/models/alert";
import { ref } from "vue";
import type { Ref } from "vue";
import type HttpError from "@/api/http_errors/http_error";

const props = defineProps({
  instance: { type: Alert, default: new Alert({}) },
  areas_options: { type: Array, default: [] },
  annotation_options: { type: Array, default: [] },
});
const emit = defineEmits(["cancel", "created"]);

const error: Ref<HttpError | undefined> = ref();

const handle_create = async () => {
  const response = await props.instance.update();

  if (response._tag == "Right") {
    error.value = undefined;
    return emit("created");
  }

  error.value = response.left;
}
</script>
