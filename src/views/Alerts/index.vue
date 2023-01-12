<template>
  <default-layout>
    <div class="h-full w-full flex items-center justify-center">
      <paginate-shower :instance="paginated_alerts" :fields="['limit', 'area', 'id']" :is_loading="is_paginated_loading"
        model_name="Alerta" @open-create="handle_open_create()" @open-show="handle_open_show($event)" />
    </div>

    <modal @close-modal="state.modal.is_open = false" :is_open="state.modal.is_open">
      <show-model-data v-if="state.modal.state === 'show'" :instance="picked" model_name="alerta"
        @open-delete="handle_open_delete($event)" @open-edit="handle_open_edit($event)" />

      <create v-if="state.modal.state === 'create'" :areas_options="areas_options"
        :annotation_options="annotation_options" @cancel="state.modal.is_open == false" @created="handle_created()" />

      <edit v-if="state.modal.state === 'edit'" :areas_options="areas_options" :instance="picked"
        :annotation_options="annotation_options" @cancel="state.modal.is_open == false" @created="handle_created()" />

      <delete-model v-if="state.modal.state === 'delete'" model_name="alerta" field="id" @deleted="handle_deleted()"
        :resource="picked" @cancel="state.modal.is_open == false" />
    </modal>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/default_layout.vue";
import PaginateShower from "@/components/PaginateShower.vue"
import Modal from "@/components/Modal.vue";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import ShowModelData from "@/components/ShowModelData.vue";
import DeleteModel from "@/components/DeleteModel.vue";
import Alert from "@/api/models/alert";
import Annotation from "@/api/models/annotation";
import Area from "@/api/models/area";
import { ref, onMounted } from "vue";

enum ModalStates {
  None = "none",
  Create = "create",
  Show = "show",
  Edit = "edit",
  Delete = "delete",
}

const is_paginated_loading = ref(false);
const paginated_alerts = ref();
const areas_options = ref();
const annotation_options = ref();
const picked = ref();
const state = ref({
  modal: {
    is_open: false,
    state: ModalStates.Create
  }
})

onMounted(async () => {
  // start loading state
  is_paginated_loading.value = true;
  await get_paginated_alerts();
  await get_areas();
  await get_annotations();
  // reset loading state
  is_paginated_loading.value = false;
})

const get_paginated_alerts = async () => {
  const response = await Alert.retrieve_paginate();
  if (response._tag == "Right")
    paginated_alerts.value = response.right;
}

const get_areas = async () => {
  const response = await Area.retrieve_list();
  if (response._tag == "Right")
    areas_options.value = response.right;
}

const get_annotations = async () => {
  const response = await Annotation.retrieve_list();
  if (response._tag == "Right")
    annotation_options.value = response.right;
}

// Event handlers
// opens
const handle_open_create = () => {
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Create;
}

const handle_open_show = (picked_resource: Alert) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Show;
}

const handle_open_delete = (picked_resource: Alert) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Delete;
}

const handle_open_edit = (picked_resource: Alert) => {
  picked.value = picked_resource;
  state.value.modal.is_open = true;
  state.value.modal.state = ModalStates.Edit;
}

// actions
const handle_created = () => {
  // refresh paginated
  get_paginated_alerts();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

const handle_deleted = () => {
  // refresh paginated
  get_paginated_alerts();
  state.value.modal.is_open = false;
  state.value.modal.state = ModalStates.None;
}

get_paginated_alerts();
</script>
