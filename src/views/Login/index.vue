<template>
  <main class="w-screen h-screen flex justify-center items-center bg-gray-100">
    <div class="min-h-[400px] p-3 bg-white shadow rounded-md flex flex-col items-center justify-around">
      <img class="w-2/3" src="@/assets/img/maxion-logo.png">
      <ErrorMessage :messages="error_messages" />
      <Input :value="form.username" @input="form.username = $event" class="mt-4" label="Username" />
      <Input :value="form.password" @input="form.password = $event" class="mt-4" label="Senha" type="password" />
      <Button @click="handle_login()" class="mt-6 mb-4 w-3/5">
        Enviar
      </Button>
    </div>
    <FullScreenLoading :is_open="is_loading" />
  </main>
</template>

<script setup lang="ts">
// compoonents
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import ErrorMessage from "@/components/ErrorMessage.vue";
// utility
import AuthenticationHandler from "@/api/authentication_handler";
import { ref } from "vue";
import router from '@/router/index';

// initialize basic variables
const auth_handler = new AuthenticationHandler();
const is_loading = ref(false);
const error_messages = ref({});

const form = ref({
  username: "super",
  password: "123",
})

// functions
const handle_login = async () => {
  is_loading.value = true;
  const response = await auth_handler.login(form.value);
  is_loading.value = false;

  if (response?.right === null) {
    console.log(response.right)
    return router.push("/");
  }

  error_messages.value = response.left.message;
}
</script>
