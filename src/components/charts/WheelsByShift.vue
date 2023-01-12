<template>
  <div class="fix-chart-index">
    <p class="WheelsByShift_title">
      Total de Rodas Inspecionadas por Turno de Trabalho
    </p>
    <VueApexCharts
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>
]

<style scoped>
.WheelsByShift_title {
  text-align: center;
  padding: 10px;
  font-size: var(--font-medium);
  color: var(--gray);
}
</style>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref } from 'vue';

const props = defineProps({
  total_inspections: {
    type: Array,
    default: [1, 1, 1],
  },
  reproved: {
    type: Array,
    default: [0.5, 0.5, 0.5],
  },
});

const series = ref([
  {
    name: 'Inspecionadas',
    data: props.total_inspections,
  },
  {
    name: 'Defeitos',
    data: props.reproved,
  },
]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -30,
    style: {
      colors: ['#737373'],
      fontWeight: 'thin',
      fontSize: '16px',
    },
    formatter: function (val, opts) {
      if (opts.seriesIndex == 0) return val;
      console.log(opts);
      props.total_inspections[opts.dataPointIndex];
      const reproved_percentage =
        (props.reproved[opts.dataPointIndex] * 100) /
        props.total_inspections[opts.dataPointIndex];
      return `${val} (${reproved_percentage.toFixed(2)}%)`;
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['1 Turno', '2 Turno', '3 Turno'],
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        fontWeight: 'bold',
        colors: ['#737373', '#737373', '#737373'],
        fontSize: '1rem',
      },
    },
  },
  yaxis: {
    labels: { show: false },
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
  },
  colors: ['#003D56', '#FF4646'],
  legend: {
    itemMargin: {
      horizontal: 20,
      vertical: 0,
    },
    fontSize: '16px',
    labels: {
      colors: ['#737373'],
    },
    markers: {
      width: '16px',
      height: '16px',
      strokeWidth: 0,
      offsetY: -2,
      radius: '16px',
    },
    floating: false,
  },
});
</script>
