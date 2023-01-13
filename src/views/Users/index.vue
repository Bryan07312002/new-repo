<template>
  <default-layout>
    <div class="h-full w-full flex items-center justify-center">
      <paginate-shower :instance="paginated_users" :fields="['username', 'full_name', 'id']" model_name="Usuários"
        :is_loading="is_paginated_loading" @open-create="handle_open_create()" @open-show="handle_open_show($event)" />
    </div>

    <modal @close-modal="state.modal.is_open = false" :is_open="state.modal.is_open">
      <create v-if="state.modal.state == 'create'" @cancel="state.modal.is_open = false" @created="handle_create()" />
      <show v-if="state.modal.state == 'show'" :resource="picked" @open-delete="handle_open_delete()" @open-edit="handle_open_edit()" />
      <delete v-if="state.modal.state == 'delete'" :resource="picked" @deleted="handle_deleted()"
        @cancel="state.modal.is_open" />
      <edit v-if="state.modal.state == 'edit'" :resource="picked" @saved="handle_edited()" @update-image-file="handle_open_update_file()"
        @update-password="handle_open_update_password()" />
      <update-image-file v-if="state.modal.state == 'updateImage'" :resource="picked" @updated="handle_updated_image_file"/>
      <update-password v-if="state.modal.state == 'updatePassword'" :resource="picked" @updated="handle_updated_password()"/>
    </modal>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/default_layout.vue";
import PaginateShower from "@/components/PaginateShower.vue";
import Modal from "@/components/Modal.vue";
import User from "@/api/models/user";
import Create from "./Create.vue";
import Show from "./Show.vue";
import Delete from "./Delete.vue";
import Edit from "./Edit.vue";
import UpdateImageFile from "./UpdateImageFile.vue";
import UpdatePassword from "./UpdatePassword.vue";
import { ref } from "vue";

enum ModalStates {
  None = "none",
  Create = "create",
  Show = "show",
  Edit = "edit",
  Delete = "delete",
  UpdateImageFile = "updateImage",
  UpdatePassword = "updatePassword"
}

const is_paginated_loading = ref(false);
const paginated_users = ref();
const picked = ref();
const state = ref({
  modal: {
    is_open: false,
    state: ModalStates.Create
  }
})

const get_paginated_users = async () => {
  // start loading state
  is_paginated_loading.value = true;
  const response = await User.retrieve_paginate();
  if (response.right)
    paginated_users.value = response.right;

  // reset loading state
  is_paginated_loading.value = false;
}

// Event handlers
// opens
const handle_open_create = () => {
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Create;
}

const handle_open_show = (picked_resource: User) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Show;
}

const handle_open_delete = () => {
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Delete;
}

const handle_open_edit = () => {
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Edit;
}

const handle_open_update_file = () => {
    state.value.modal.is_open = true;
    state.value.modal.state = ModalStates.UpdateImageFile;
}

const handle_open_update_password = () => {
    state.value.modal.is_open = true;
    state.value.modal.state = ModalStates.UpdatePassword;
}

// actions
const handle_create = () => {
  get_paginated_users();
  closeModal()
}

const handle_deleted = () => {
  get_paginated_users();
  closeModal()
}

const handle_edited = () => {
  get_paginated_users();
  closeModal()
}

const handle_updated_image_file = (updated_picked: User) => {
  get_paginated_users();
  picked.value = updated_picked;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Edit;
}

const handle_updated_password = () => {
  get_paginated_users();
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Edit;
}

const closeModal = () => {
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

get_paginated_users();
</script>
