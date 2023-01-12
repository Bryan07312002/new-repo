<template>
  <div class="chart_title fix-chart-index">
    <p>Pareto de Rodas Reprovadas por Modelo</p>
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
  model_names?: string[];
  defects_by_model?: number[];
  accumulated_percentage?: number[];
}

class ChartData {
  model_names?: string[];
  defects_by_model?: number[];
  accumulated_percentage?: number[];

  constructor(props: ChartProps) {
    this.model_names = props.model_names ?? [''];
    this.defects_by_model = props.defects_by_model ?? [0];
    this.accumulated_percentage = props.accumulated_percentage ?? [0];
  }
}

const props = defineProps({
  data: {
    type: Object,
    default: {
      model_names: [''],
      defects_by_model: [0],
      accumulated_percentage: [0],
    },
  },
});

const series = ref([
  {
    name: 'Defeitos',
    type: 'column',
    data: props.data.defects_by_model,
  },
  {
    name: 'Pareto',
    type: 'line',
    data: props.data.accumulated_percentage,
  },
]);

const chartOptions = ref({
  chart: {
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#ff4646', 'gray'],
  xaxis: {
    categories: props.data.model_names,
  },
  stroke: {
    width: [1, 4, 4],
  },
  yaxis: [
    {
      show: true,
      labels: {
        formatter: function (val: number) {
          return parseInt(val.toString())
        },
      },
    },
    {
      show: true,
      opposite: true,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: function (val: number) {
          if (val > 0.1) return val + '%';
          else return '0%';
        },
      },
    },
  ],
  legend: {
    show: false,
  },
});

watch(props, () => {
  if (props.data.defects_by_model && props.data.accumulated_percentage && props.data.model_names) {
    series.value = [
      {
        name: 'Defeitos',
        type: 'column',
        data: props.data.defects_by_model,
      },
      {
        name: 'Pareto',
        type: 'line',
        data: props.data.accumulated_percentage,
      },
    ];

    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        categories: props.data.model_names,
      },
    };
    return
  }

  const data = new ChartData({});

  series.value = [
    {
      name: 'Defeitos',
      type: 'column',
      data: data.defects_by_model,
    },
    {
      name: 'Pareto',
      type: 'line',
      data: data.accumulated_percentage,
    },
  ];

  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      categories: data.model_names,
    },
  };
});
</script>
