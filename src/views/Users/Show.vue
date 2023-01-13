<template>
  <div class="p-6 min-w-[26rem]">
    <h2 class="font-semibold text-center pb-2">Visualizar Usuário</h2>
    <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />
    <div class="flex my-2.5 justify-center h-[12vh] min-h-0">
        <div ref="divImage" class="flex justify-center h-full w-[12vh] min-h-0 relative rounded-full overflow-hidden">
            <img :src='resource.data.photo' ref="image" class='h-full w-full absolute' alt="Profile picture">
        </div>
    </div>
    <show-field class="mt-3" label="Nome completo" :value="resource.data.full_name" />
    <show-field class="mt-3" label="Nome de usuário" :value="resource.data.username" />

    <div class="flex justify-between mt-6 gap-1.5">
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
import User from "@/api/models/user";
import ShowField from "@/components/ShowField.vue";
import ButtonVue from "@/components/Button.vue";

const props = defineProps({
  resource: {
    type: User,
    default: new User({})
  }
})

const emit = defineEmits(["open-delete", "open-edit"]);
</script>
