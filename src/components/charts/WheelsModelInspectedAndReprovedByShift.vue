<template>
  <div 
    class="chart_title fix-chart-index"
  >
    <p>Total de Rodas Inspecionadas e Reprovadas por Turno</p>
    <div class="chart-conatainer">
      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions_first" :series="series_first" />
        <div class="chart_base">
          <p>Turno 1</p>
        </div>
      </div>

      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions_second" :series="series_second" />
        <div class="chart_base">
          <p>Turno 2</p>
        </div>
      </div>

      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions_third" :series="series_third" />
        <div class="chart_base">
          <p>Turno 3</p>
        </div>
      </div>
    </div>
  </div> 
</template>

<style scoped>
  .chart-conatainer {
    display:flex;
    justify-content: center;
  }
  .chart_block {
    width:100%;
  }
  .chart_title {
    text-align: center;
    padding: 10px;
    font-size: var(--font-medium);
    color: var(--gray);
  }
</style>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, watch } from "vue"

const props = defineProps({
  data:{
    default:{
      models_1st:[],
      total_inspections_1st: [],
      suspected_1st: [],

      models_2nd:[],
      total_inspections_2nd: [],
      suspected_2nd: [],

      models_3rd:[],
      total_inspections_3rd: [],
      suspected_3rd: []
    }
  }
})

const series_first = ref([{
    data: props.data.suspected_1st
  },
  {
    data: props.data.total_inspections_1st
  }
])

const series_second = ref([{
    data: props.data.suspected_2nd
  },
  {
    data: props.data.total_inspections_2nd
  }
])

const series_third = ref([{
    data: props.data.suspected_3rd
  },
  {
    data: props.data.total_inspections_3rd
  }
])

const chartOptions_first = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show:false
    },
  },
  colors: ['#ff4646', '#003d56'],
  dataLabels: {
    enabled: true
  },
  grid:{
    show: false
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    show: false
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  }
})

const chartOptions_second = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show:false
    },
  },
  colors: ['#ff4646', '#003d56'],
  dataLabels: {
    enabled: true
  },
  grid:{
    show: false
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    show: false
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  }
})

const chartOptions_third = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show:false
    },
  },
  colors: ['#ff4646', '#003d56'],
  dataLabels: {
    enabled: true
  },
  grid:{
    show: false
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    show: false
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  }
})

watch(props, () => {
  series_first.value = [{
      data: props.data.suspected_1st
    },
    {
      data: props.data.total_inspections_1st
    }
  ]

  series_second.value = [{
      data: props.data.suspected_2nd
    },
    {
      data: props.data.total_inspections_2nd
    }
  ]

  series_third.value = [{
      data: props.data.suspected_3rd
    },
    {
      data: props.data.total_inspections_3rd
    }
  ]

  chartOptions_first.value = {
    ...chartOptions_first.value,
    xaxis: {
      categories: props.data.models_1st,
    },
  };

  chartOptions_second.value = {
    ...chartOptions_second.value,
    xaxis: {
      categories: props.data.models_2nd,
    },
  };

  chartOptions_third.value = {
    ...chartOptions_third.value,
    xaxis: {
      categories: props.data.models_3rd,
    },
  };
});

</script>
