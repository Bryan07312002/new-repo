<template>
  <default-layout>
    <div class="container mx-auto">
      <div class="filter-container">
        <input-vue class="filter-input" label="De" @input="filter.start_date = $event" :value="filter.start_date"
          type="date" />
        <input-vue class="filter-input" label="Até" @input="filter.end_date = $event" :value="filter.end_date"
          type="date" />
        <select-one class="filter-input" label="Processo" :options="process_options" :value="filter.process_id"
          @updateValue="filter.process_id = $event" />
        <Button @click="get_dashboard_data()" class="search-button btn-blue">
          Buscar
        </Button>
      </div>

      <div>
        <loading-place-holder v-if="page_load_state.header_data" class="p-10" />
        <BasicInfo v-else :inspected_wheels="header_data?.inspected_wheels"
          :reproved_wheels_number="header_data?.reproved_wheels_number"
          :reproved_wheels_percentage="header_data?.reproved_wheels_percentage" :medium_time="header_data?.mtbf" />
      </div>

      <div class="gray-underline" />

      <div class="legend-container">
        <h2>Rodas e Modelos</h2>
        <div class="legend_sub-container">
          <div class="legend_dot">
            <div class="dot blue" />
            <p>Total Inspecionado</p>
          </div>
          <div class="legend_dot">
            <div class="dot red" />
            <p>Rodas reprovadas</p>
          </div>
        </div>
      </div>

      <div>
        <loading-place-holder v-if="page_load_state.wheels_data" class="p-10" />
        <div class="dashboard-container">
          <ParetoReprovedWheels class="half-chart" :data="wheels_data?.ParetoReprovedWheels" />
          <TotalWheels class="half-chart" :data="wheels_data?.TotalWheels" />
          <WheelsReprovedByTotalInspected class="full-chart" :data="wheels_data?.WheelsReprovedByTotalInspected" />
          <WheelsModelInspectedAndReprovedByShift class="full-chart"
            :data="wheels_data?.WheelsModelInspectedAndReprovedByShift" />
        </div>
      </div>

      <div class="gray-underline" />

      <div>
        <loading-place-holder v-if="page_load_state.defects_data" class="p-10" />
        <div class="legend-container">
          <h2>Rodas e Modelos</h2>
          <div class="dashboard-container">
            <IdentifiedDefectsByShift class="two-third-chart" :data="defects_data?.IdentifiedDefectsByShift" />
            <TotalDefectsIdentified class="one-third-chart" :data="defects_data?.TotalDefectsIdentified" />
            <DefectsByWheelArea class="full-chart" :data="defects_data?.DefectsByWheelArea" />
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/default_layout.vue";
import InputVue from "@/components/Input.vue";
import SelectOne from "@/components/SelectOne.vue";
import Button from "@/components/Button.vue";
import TotalWheels from '@/components/charts/TotalWheelsInspectedReprovedByShift.vue';
import ParetoReprovedWheels from '@/components/charts/ParetoReprovedWheels.vue';
import WheelsReprovedByTotalInspected from '@/components/charts/WheelsReprovedByTotalInspected.vue';
import WheelsModelInspectedAndReprovedByShift from '@/components/charts/WheelsModelInspectedAndReprovedByShift.vue';
import IdentifiedDefectsByShift from '@/components/charts/IdentifiedDefectsByShift.vue';
import TotalDefectsIdentified from '@/components/charts/TotalDefectsIdentified.vue';
import DefectsByWheelArea from '@/components/charts/DefectsByWheelArea.vue';
import BasicInfo from './BasicInfo.vue';
import LoadingPlaceHolder from "@/components/LoadingPlaceHolder.vue";
import HttpError from "@/api/http_errors/http_error";
import Process from "@/api/models/process";
import type { ProcessProps } from "@/api/models/process";
import API from "@/api/API";

import { ref, onMounted } from "vue";
import type { Ref } from "vue";

interface Filter {
  start_date: string,
  end_date: string,
  process_id: number,
}

interface PageLoadState {
  header_data: boolean;
  wheels_data: boolean;
  defects_data: boolean;
}

const page_load_state: Ref<PageLoadState> = ref({
  header_data: true,
  wheels_data: true,
  defects_data: true
});

const wheels_data = ref();
const process_options = ref([]);
const defects_data = ref();
const header_data = ref();
const filter: Ref<Filter> = ref({
  start_date: '',
  end_date: '',
  process_id: 0,
});

onMounted(() => {
  get_dashboard_data()
  get_process_list();
})

const get_dashboard_data = async () => {
  get_wheels_data(
    wheels_data,
    filter.value.process_id,
    filter.value.start_date,
    filter.value.end_date
  );

  get_defects_data(
    defects_data,
    filter.value.process_id,
    filter.value.start_date,
    filter.value.end_date
  );

  get_header_data(
    header_data,
    filter.value.process_id,
    filter.value.start_date,
    filter.value.end_date
  );
}

const get_process_list = async () => {
  const response = await Process.retrieve_list();
  if (response._tag === "Right") {
    process_options.value = response.right.reduce((arr: Array<Object>, process: ProcessProps) => {
      arr.push({ id: process.id, name: process.name })
      return arr
    }, []);
  }
}

const get_wheels_data = async (
  data: Ref<undefined | any>,
  process_id: number | string = '',
  start_date = '',
  end_date = ''
) => {
  page_load_state.value.wheels_data = true;
  const api = new API();
  let response = await api.get(`/dashboard_wheels?process_id=${process_id}&start_date=${start_date}&end_dat=${end_date}`);
  if (response.status !== 200) {
    data.value = response.data;
    page_load_state.value.wheels_data = false;
    return response;
  }

  page_load_state.value.wheels_data = false;
  return new HttpError(response);
}

const get_defects_data = async (
  data: Ref<undefined | any>,
  process_id: number | string = '',
  start_date = '',
  end_date = ''
) => {
  page_load_state.value.defects_data = true;
  const api = new API();
  let response = await api.get(`/dashboard_defects?process_id=${process_id}&start_date=${start_date}&end_date=${end_date}`);
  if (response.status !== 200) {
    data.value = response.data;
    page_load_state.value.defects_data = false;
    return response;
  }

  page_load_state.value.defects_data = false;
  return new HttpError(response);
}

const get_header_data = async (
  data: Ref<undefined | any>,
  process_id: number | string = '',
  start_date = '',
  end_date = ''
) => {
  page_load_state.value.header_data = true;
  const api = new API();
  let response = await api.get(`/dashboard_header?process_id=${process_id}&start_date=${start_date}&end_date=${end_date}`);

  if (response.status === 200) {
    data.value = response.data;
    page_load_state.value.header_data = false;
    return response;
  }

  page_load_state.value.header_data = false;
  return new HttpError(response);
}
</script>

<style scoped>
.legend_sub-container {
  display: flex;
}

.blue {
  background-color: var(--dark-blue);
}

.red {
  background-color: var(--red);
}

.dot {
  width: 10px;
  height: 10px;
  margin: auto;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
}

.legend-container h2 {
  margin: 20px;
  font-size: var(--font-medium-plus);
}

.legend-container {
  color: var(--gray);
  margin-inline: auto;
  width: fit-content;
  text-align: center;
}

.legend_dot {
  display: flex;
}

.dashboard-container {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  margin-inline: auto;
}

.full-chart {
  width: 95%;
  margin: 1%;
}

.half-chart {
  width: 45%;
  margin: 1%;
}

.two-third-chart {
  width: 50%;
  margin: 1%;
}

.btn-blue {
  padding: 5px;
  min-width: 100px;
}

.btn-blue:hover .fill-white {
  fill: var(--very-dark-blue);
}

.center {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.fill-white {
  fill: white;
}

.one-third-chart {
  width: 35%;
  margin: 2%;
}

.gray-underline {
  width: 70%;
  height: 1px;
  background-color: var(--gray);
  margin-inline: auto;
}

.filter-container {
  max-width: 60vw;
  display: flex;
  margin-inline: auto;
  align-items: center;
  justify-content: center;
}

.filter-input {
  margin: 20px 30px 0px 30px;
  align-self: flex-end;
}

.search-button {
  height: 35px;
  margin: 20px 30px 0px 30px;
  align-self: flex-end;
}
</style>
