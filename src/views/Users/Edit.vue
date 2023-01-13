<template>
    <div class="bg-white p-6 rounded-md w-96">
        <h2 class="font-semibold text-center pb-2">Editar Usuário</h2>
        <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />

        <div class="flex my-2.5 justify-center h-[12vh] min-h-0">
            <div ref="divImage" class="flex justify-center h-full w-[12vh] min-h-0 relative rounded-full overflow-hidden">
                <img :src='resource.data.photo' ref="image" class='h-full w-full absolute' alt="Profile picture">
            </div>
        </div>
        
        <error-message :messages="error" />
        <input-vue :value="userCopy.full_name" @input="userCopy.full_name = $event"
            label="Nome completo" />
        <input-vue :value="userCopy.username" @input="userCopy.username = $event" label="Nome de usuário"
            class="mt-3" />
        <!-- <input-vue :value="resource.data.full_name" @input="resource.data.full_name = $event"
            label="Nome completo" />
        <input-vue :value="resource.data.username" @input="resource.data.username = $event" label="Nome de usuário"
            class="mt-3" /> -->

        <div class="w-full flex justify-between mt-5 gap-1.5">
            <button-vue type="blue" class="w-6/12" @click="emit('update-password')">
                Alterar senha
            </button-vue>
            <button-vue type="blue" class="w-6/12" @click="emit('update-image-file')">
                Alterar foto
            </button-vue>
        </div>
        <div class="w-full flex justify-between mt-5">
            <button-vue type="blue" class="w-full" @click="handle_save()">
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
import User from '@/api/models/user';

const props = defineProps({
    resource: {
        type: User,
        default: new User({}),
    }
});

const emit = defineEmits(["cancel", "saved", "update-image-file", "update-password"]);

const error = ref({});
const userCopy = ref({...props.resource.data})

const handle_save = async () => {
    props.resource.data = {...userCopy.value};
    const response = await props.resource.update();
    if (response.right !== undefined) {
        error.value = {};
        return emit('saved')
    }
    error.value = response.left.message;
    console.log(response.left.message) 
}


</script>
<style scoped>
.circular-clip {
    clip-path: circle(calc(6vh - 0.625rem) at center);
}
</style>