<template>
  <div class="chart_title fix-chart-index">
    <p>Total de Rodas Inspecionadas e Reprovadas por Turno</p>
    <VueApexCharts height="350" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>

<style scoped>
.chart_title {
  text-align: center;
  padding: 10px;
  font-size: var(--font-medium);
  color: var(--gray);
}
</style>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { ref, watch } from 'vue';

type ChartProps = {
  total_inspected?: any[],
  suspected?: any[],
}

class ChartData {
  total_inspected: any[];
  suspected: any[];

  constructor(props: ChartProps) {
    this.suspected = props.suspected ?? [];
    this.total_inspected = props.total_inspected ?? [];
  }
}

const props = defineProps({
  data: {
    type: Object,
    default: {
      total_inspected: [],
      suspected: [],
    },
  },
});

const series = ref([
  {
    name: 'Total Inspecionadas',
    data: props.data.total_inspected,
  },
  {
    name: 'Suspeitas',
    data: props.data.suspected,
  },
]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  colors: ['#003d56', '#ff4646'],
  dataLabels: {
    enabled: true,
  },
  grid: {
    show: false,
  },
  stroke: {
    width: 0,
  },
  yaxis: {
    show: true,
  },
  xaxis: {
    categories: ['1 turno', '2 turno', '3 turno'],
    show: false,
  },
  tooltip: {
    enabled: true,
  },
  legend: {
    show: false,
  },
});

watch(props, () => {
  if (props.data.defects_by_model && props.data.accumulated_percentage && props.data.model_names) {
    series.value = [
      {
        name: 'Total Inspecionadas',
        data: props.data.total_inspected,
      },
      {
        name: 'Suspeitas',
        data: props.data.suspected,
      },
    ];
    return
  }

  const data = new ChartData({});

  series.value = [
    {
      name: 'Total Inspecionadas',
      data: data.total_inspected,
    },
    {
      name: 'Suspeitas',
      data: data.suspected,
    },
  ];
});
</script>
