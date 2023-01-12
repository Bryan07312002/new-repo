<template>
  <loading-place-holder v-if="is_loading" class="p-10" />
  <modal-base v-else title="Editar defeito">
    <error-message :messages="error" />
    <input-vue class="mt-3" label="Name" :value="instance.data.name" @input="instance.data.name = $event" />
    <input-vue class="mt-3" label="Label" :value="instance.data.label" @input="instance.data.label = $event" />
    <select-one class="mt-3" label="Process" :value="instance.data.process" @input="instance.data.process = $event"
      :options="process_options" />
    <div class="w-full flex justify-between mt-5">
      <button-vue type="gray" class="w-5/12" @click="emit('cancel')">
        Cancelar
      </button-vue>
      <button-vue type="blue" class="w-5/12" @click="handle_edit()">
        Salvar
      </button-vue>
    </div>
  </modal-base>
</template>

<script setup lang="ts">
import InputVue from "@/components/Input.vue";
import SelectOne from "@/components/SelectOne.vue";
import ButtonVue from "@/components/Button.vue";
import LoadingPlaceHolder from "@/components/LoadingPlaceHolder.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import ModalBase from "@/components/ModalBase.vue";
import AnnotationLabel from "@/api/models/annotation";
import { ref } from "vue";

const props = defineProps({
  instance: { type: AnnotationLabel, default: new AnnotationLabel({}) },
  process_options: { type: Array, default: [] }
})
const emit = defineEmits(["cancel", "edited"]);
const is_loading = ref(false);
const error = ref();

const handle_edit = async () => {
  is_loading.value = true;
  const response = await props.instance.update();

  console.log(response)
  if (response._tag === "Right") {
    return emit('edited');
  }

  error.value = response.left.message;
  is_loading.value = false;
}
</script>
