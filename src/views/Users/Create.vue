<template>
  <div class="bg-white p-6 rounded-md w-96">
    <h2 class="font-semibold text-center pb-2">Criar Usuário</h2>
    <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />
    <error-message :messages="error" />
    <input-vue :value="user.data.full_name" @input="user.data.full_name = $event" label="Nome de completo"
      class="mt-3" />
    <input-vue :value="user.data.username" @input="user.data.username = $event" label="Nome de usuário" class="mt-3" />
    <input-vue :value="user.data.password" :type="'password'" @input="user.data.password = $event" label="Senha" class="mt-3" />

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
import ButtonVue from '@/components/Button.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { ref } from "vue";
import User, { UserProps } from '@/api/models/user';

const emit = defineEmits(["cancel", "created"]);

const user = ref(new User({}));
const error = ref({});

const handle_create = async () => {
  const response = await user.value.create();

  if (response.right !== undefined) {
    error.value = {};
    return emit("created");
  }

  error.value = response.left.message;
  console.log(response.left.message) 

}
</script>
