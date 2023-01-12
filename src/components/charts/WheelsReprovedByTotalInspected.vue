<template>
  <div 
    class="chart_title fix-chart-index"
  >
    <p>Rodas Reprovadas pelo Total Inpecionado</p>
    <div class="chart-container">
      <VueApexCharts class="adjust" height="250" :options="chartOptions_data" :series="series_data" />
      <VueApexCharts class="adjust" height="250" :options="chartOptions_percentage" :series="series_percentage" />
    </div>
  </div> 
</template>

<style scoped>
  .chart_title {
    text-align: center;
    padding: 10px;
    font-size: var(--font-medium);
    color: var(--gray);
  }
  .chart-container {
    display: flex;
    flex-wrap: nowrap;
  }
  .adjust {
  width: 50%;
  }
</style>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: {
      models: [0,0,0],
      total_inspected: [0,0,0],
      suspect: [0,0,0],
      suspect_percentage: [0,0,0],
    },
  },
});

const series_data = ref([
  {
    data: props.data.suspect
  },
  {
    data: props.data.total_inspected
  }
])

const series_percentage = ref([
  {
    data: props.data.suspect_percentage
  }
])

const chartOptions_data = ref({
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
  xaxis: {
    show: false,
    categories: props.data.models,
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  }
})

const chartOptions_percentage = ref({
  chart: {
    type: 'bar',
    stacked: false,
    toolbar: {
      show:false
    },
  },
  colors: ['#FF6666'],
  dataLabels: {
    enabled: true,
    // offsetY:60,
    // style: {
    //   colors:["#737373"],
    //   fontWeight: "thin",
    //   fontSize: "16px"
    // },
    formatter: function (val) {
      if (val != null) return `${val.toFixed(2)}%`
      return ''
    }
  },
  grid:{
    show: false
  },
  xaxis: {
    show: false,
    categories: props.data.models,
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  }
})

watch(props, () => {
  series_data.value = [
    {
      data: props.data.suspect
    },
    {
      data: props.data.total_inspected
    }
  ]

  series_percentage.value = [
    {
      data:props.data.suspect_percentage
    }
  ]

  chartOptions_data.value = {
    ...chartOptions_data.value,
    xaxis: {
      categories: props.data?.models,
    },
  };

  chartOptions_percentage.value = {
    ...chartOptions_percentage.value,
    xaxis: {
      categories: props.data.models,
    },
  };
});
</script>
