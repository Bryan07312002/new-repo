<template>
  <default-layout class="">
    <div class="h-full w-full flex items-center justify-center">
      <paginate-shower :instance="paginated_annotations" :fields="['name', 'label', 'id']" model_name="Defeito"
        @change_page="paginated_annotations = $event" :is_loading="is_paginated_loading"
        @open-create="handle_open_create()" @open-show="handle_open_show($event)" />
    </div>

    <modal @close-modal="state.modal.is_open = false" :is_open="state.modal.is_open">
      <show-model-data v-if="state.modal.state === 'show'" :instance="picked" model_name="defeito"
        @open-delete="handle_open_delete($event)" @open-edit="handle_open_edit($event)" />

      <delete-model v-if="state.modal.state === 'delete'" model_name="defeito" field="name" :resource="picked"
        @deleted="handle_deleted()" @cancel="state.modal.is_open = false" />

      <create v-if="state.modal.state === 'create'" @cancel="state.modal.is_open = false" @created="handle_created()"
        :process_options="process_options" />

      <edit v-if="state.modal.state === 'edit'" @cancel="state.modal.is_open = false" @edited="handle_edited()"
        :instance="picked" :process_options="process_options" />
    </modal>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/default_layout.vue";
import PaginateShower from "@/components/PaginateShower.vue";
import Modal from "@/components/Modal.vue";
import ShowModelData from "@/components/ShowModelData.vue";
import DeleteModel from "@/components/DeleteModel.vue";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import AnnotationLabel from "@/api/models/annotation";
import Process from "@/api/models/process";
import { ref, onMounted } from "vue";

import type { ModalState } from "@/components/Modal.vue";
import type { AnnotationLabelProps } from "@/api/models/annotation";
import type { Ref } from "vue";
import type { Paginate } from "@/api/basic_utils";

enum ModalStates {
  None = "none",
  Create = "create",
  Show = "show",
  Edit = "edit",
  Delete = "delete",
}

interface PageState {
  modal: ModalState<ModalStates>;
}

const is_paginated_loading: Ref<boolean> = ref(false);
const paginated_annotations: Ref<Paginate<AnnotationLabel> | undefined> = ref();
const process_options: Ref<object[]> = ref([]);
const picked: Ref<AnnotationLabel | undefined> = ref();
const state: Ref<PageState> = ref({
  modal: {
    is_open: false,
    state: ModalStates.None
  }
})

onMounted(async () => {
  // start loading state
  is_paginated_loading.value = true;

  await get_paginated_annotations();
  await get_process_list();

  // reset loading state
  is_paginated_loading.value = false;
})

const get_paginated_annotations = async () => {
  const response = await AnnotationLabel.retrieve_paginate();
  if (response._tag === "Right")
    paginated_annotations.value = response.right;
}

const get_process_list = async () => {
  const response = await Process.retrieve_list();
  if (response._tag === "Right") {
    process_options.value = response.right.reduce((arr: Array<Object>, process: AnnotationLabelProps) => {
      arr.push({ id: process.id, name: process.name })
      return arr
    }, []);
  }
}

// Event handlers
// opens
const handle_open_create = () => {
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Create;
}

const handle_open_show = (picked_resource: AnnotationLabel) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Show;
}

const handle_open_delete = (picked_resource: AnnotationLabel) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Delete;
}

const handle_open_edit = (picked_resource: AnnotationLabel) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Edit;
}

// actions
const handle_created = () => {
  // refresh paginated
  get_paginated_annotations();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

const handle_deleted = () => {
  // refresh paginated
  get_paginated_annotations();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

const handle_edited = () => {
  // refresh paginated
  get_paginated_annotations();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}
</script>
