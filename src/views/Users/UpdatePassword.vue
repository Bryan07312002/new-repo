<template>
    <div class="bg-white p-6 rounded-md w-96">
        <h2 class="font-semibold text-center pb-2">Alteração de senha</h2>
        <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />

        <error-message :messages="error" />
        <input-vue @input="passwordObject.old_password = $event" label="Senha atual" type="password" />
        <input-vue @input="passwordObject.new_password1 = $event" label="Nova senha" type="password" class="mt-3" />
        <input-vue @input="passwordObject.new_password2 = $event" label="Confirmação de nova senha" type="password" class="mt-3" />

        <div class="w-full flex justify-between mt-5">
            <button-vue type="blue" class="w-full" @click="handle_save()">
                Salvar
            </button-vue>
        </div>
    </div>

</template>
<script setup lang='ts'>
import User from '@/api/models/user';
import { ref, reactive } from "vue";
import InputVue from '@/components/Input.vue';
import ButtonVue from '@/components/Button.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import API from '@/api/API';


const error = ref({});
const props = defineProps({
    resource: {
        type: User,
        default: new User({}),
    }
});

const emit = defineEmits(["updated"]);

const passwordObject = reactive({
    old_password: '',
    new_password1: '',
    new_password2: '',
})

const handle_save = async () => {
    if (passwordObject.new_password1 != passwordObject.new_password2) {
        error.value = ['As novas senhas não são iguais.']
        console.log('As novas senhas não são iguais.')
        return
    }

    const api = new API()
    const response = await api.patch(`users/${props.resource.data.id}/update_password/`, { ...passwordObject })
    if (response.status >= 200 && response.status < 300) {
        return emit('updated')
    }
    error.value = response.left.message;
    console.log(response.left.message) 
}

</script>