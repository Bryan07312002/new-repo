<template>
  <div class="p-6 min-w-[40vw]">
    <h2 class="font-semibold text-center pb-2">Visualizar {{ model_name }}</h2>
    <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />

    <template v-for="(value, name) in instance.data">
      <show-field v-if="typeof (value) != 'boolean'" class="mt-3" :label="name" :value="value ?? 'Não encontrado'" />
      <div v-else>show bool field</div>
    </template>

    <div class="flex justify-between mt-6">
      <button-vue type="red" class="w-5/12" @click="emit('open-delete')">
        Deletar
      </button-vue>
      <button-vue class="w-5/12" @click="emit('open-edit')">
        Editar
      </button-vue>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonVue from "@/components/Button.vue";
import ShowField from "@/components/ShowField.vue";

const props = defineProps({
  instance: {
    default: Object
  },
  model_name: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(["open-edit", "open-delete"]);
</script>
