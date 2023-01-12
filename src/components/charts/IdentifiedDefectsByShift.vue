<template>
  <div class="chart_title fix-chart-index">
    <p>Defeitos identificados por Turno</p>
    <div class="chart-conatainer">
      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions" :series="series_1" />
        <div class="chart_base">
          <p>Turno 1</p>
        </div>
      </div>

      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions" :series="series_2" />
        <div class="chart_base">
          <p>Turno 2</p>
        </div>
      </div>

      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions" :series="series_3" />
        <div class="chart_base">
          <p>Turno 3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-conatainer {
  display: flex;
  justify-content: center;
}

.chart_block {
  width: 100%;
}

.chart_title {
  text-align: center;
  padding: 10px;
  font-size: var(--font-medium);
  color: var(--gray);
}
</style>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { ref, watch } from "vue"

const props = defineProps({
  data: {
    default: {
      defects_count: [[], [], [], []],
      defects_names: ['', '', '']
    }
  }
})

const series_1 = ref([{
  data: props.data.defects_count[0] ?? []
},
])

const series_2 = ref([{
  data: props.data.defects_count[0] ?? []
},
])

const series_3 = ref([{
  data: props.data.defects_count[0] ?? []
},
])

const chartOptions = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false
    },
  },
  colors: ['#003d56', '#00628a', '#737373'],
  dataLabels: {
    enabled: true
  },
  grid: {
    show: false
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    categories: props.defects_name ?? [],
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  }
})
watch(props, () => {
  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      categories: props.data.defects_names ?? [],
    },
  };
  series_1.value = [{
    data: props.data.defects_count[0] ?? []
  },
  ];
  series_2.value = [{
    data: props.data.defects_count[1] ?? []
  },
  ];
  series_3.value = [{
    data: props.data.defects_count[2] ?? []
  },
  ];
});
</script>
