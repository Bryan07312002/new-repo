<template>
  <div class="fix-chart-index">
    <p class="WheelsByShift_title">Defeitos Encontrados no Modelo {{ model }}</p>
    <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>

<style scoped>
.WheelsByShift_title {
  text-align: center;
  padding: 10px;
  font-size: var(--font-medium);
  color: var(--gray);
}
</style>

<script setup lang="ts" >
import VueApexCharts from "vue3-apexcharts";
import { ref } from 'vue';

const props = defineProps({
  defects_name: {
    type: Array,
    default: [1, 1, 1]
  },
  defects_number: {
    type: Array,
    default: [1, 1, 1]
  },
  model: {
    type: String,
    default: '{Model Name not given}'
  }
})

const series = ref([
  {
    name: 'Defeitos',
    data: props.defects_number.sort().reverse()
  },
])

const chartOptions = ref(
  {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true,
        dataLabels: {
          position: 'top',
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -30,
      style: {
        fontWeight: "bold",
        colors: ['#737373'],
        fontSize: '1rem',
      }
    },
    stroke: {
      width: 0
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      categories: props.defects_name,
      labels: {
        style: {
          fontWeight: "bold",
          colors: ['#737373'],
          fontSize: '1rem',
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      labels: { show: false },

    },
    grid: {
      yaxis: {
        lines: { show: false },
      },
      xaxis: { lines: { show: false } }
    },
    fill: {
      opacity: [1, 0.7, 0.6]
    },
    colors: ['#FF4646'],
    legend: {
      show: false

    }
  })
</script>
