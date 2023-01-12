<template>
  <div 
    class="chart_title fix-chart-index"
  >
    <p>Top 5 Defeitos encontrados</p>
    <div class="chart-conatainer">
      <div class="chart_block">
        <VueApexCharts height="350" :options="chartOptions" :series="series" />
        <div class="chart_base">
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
  data: {
    default: {
      defects_names: ['','',''],
      defects_count: [0,0,0]
    }
  }
})



const series = ref([
  {
    data: props.data.defects_count,
  },
])

const chartOptions = ref({
  chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      show:false,
      categories: props.data.defects_names,
      axisBorder:{
        show:false
      },
    },
    yaxis: {
      axisBorder:{
        show:false
      },
    },
    grid:{
      show:false
    },
    colors: [
      '#ff4646',
    ],
    legend:{
      show: false
    }
  })

watch(props, () => {
  series.value = [
    {
      data: props.data.defects_count,
    }
  ]
  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      categories: props.data.defects_names,
    },
  };
});
</script>
