<template>
  <div class="p-6">
    <h2 class="font-semibold text-center pb-2">Deletar Usuário</h2>
    <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />
    <p class="p-4">Deseja mesmo excluir usuário <b>{{ resource.data.username }}</b>?</p>
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
import User from "@/api/models/user";
import ButtonVue from "@/components/Button.vue";

const props = defineProps({
  resource: {
    type: User,
    default: new User({}),
  }
});

const emit = defineEmits(["cancel", "deleted"]);

const handle_delete = async () => {
  const response = await props.resource.delete();
  console.log(response);
}
</script>
