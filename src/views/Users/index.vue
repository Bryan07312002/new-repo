<template>
  <default-layout>
    <div class="h-full w-full flex items-center justify-center">
      <paginate-shower :instance="paginated_users" :fields="['username', 'full_name', 'id']"
        :is_loading="is_paginated_loading" @open-create="handle_open_create()" @open-show="handle_open_show($event)" />
    </div>

    <modal @close-modal="state.modal.is_open = false" :is_open="state.modal.is_open">
      <create v-if="state.modal.state == 'create'" @cancel="state.modal.is_open = false" @created="handle_create()" />
      <show v-if="state.modal.state == 'show'" :resource="picked" @open-delete="handle_open_delete()" />
      <delete v-if="state.modal.state == 'delete'" :resource="picked" @deleted="handle_deleted()"
        @cancel="state.modal.is_open" />
    </modal>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/default_layout.vue";
import PaginateShower from "@/components/PaginateShower.vue"
import Modal from "@/components/Modal.vue";
import User from "@/api/models/user";
import Create from "./Create.vue";
import Show from "./Show.vue";
import Delete from "./Delete.vue";
import { ref } from "vue";

enum ModalStates {
  None = "none",
  Create = "create",
  Show = "show",
  Edit = "edit",
  Delete = "delete",
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

// actions
const handle_create = () => {
  // refresh paginated
  get_paginated_users();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

const handle_deleted = () => {
  // refresh paginated
  get_paginated_users();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

get_paginated_users();
</script>
