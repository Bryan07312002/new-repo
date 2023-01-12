<template>
    <div class="fix-chart-index">
        <p class="WheelsByShift_title">Ocorrência de Defeitos por Região da Roda</p>
        <div class="flex">
            <div>
                <img src="@/assets/img/colored_wheel.png" />
                <div class="flex dots-contaier">
                    <div class="dot-contaier">
                        <div class="dot A" />
                        <p>Zona A</p>
                    </div>
                    <div class="dot-contaier">
                        <div class="dot B" />
                        <p>Zona B</p>
                    </div>
                    <div class="dot-contaier">
                        <div class="dot C" />
                        <p>Zona C</p>
                    </div>
                </div>
            </div>
            <div class="char-container full">
                <div class="chart-card" v-if="series.length > 0">
                    <VueApexCharts class="full" type="bar" height="350" :options="chartOptions" :series="series[0]">
                    </VueApexCharts>
                    <p>Zona A</p>
                </div>
                <div class="chart-card" v-if="series.length > 1">
                    <VueApexCharts class="full" type="bar" height="350" :options="chartOptions" :series="series[1]">
                    </VueApexCharts>
                    <p>Zona B</p>
                </div>
                <div class="chart-card" v-if="series.length > 2">
                    <VueApexCharts class="full" type="bar" height="350" :options="chartOptions" :series="series[2]">
                    </VueApexCharts>
                    <p>Zona C</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { ref, watch } from "vue"

type ChartProps = {
    defects_names?: string[];
    defects_count?: any[];
}

class ChartData {
    defects_names: string[];
    defects_count: string[];

    constructor(props: ChartProps) {
        this.defects_count = props.defects_count ?? [[], [], []];
        this.defects_names = props.defects_names ?? ['', '', ''];
    }
}

const props = defineProps({
    data: {
        type: Object,
        default: {
            defects_names: ['', '', ''],
            defects_count: [[], [], []]
        }
    },
})
const series = ref([])

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
            horizontal: false,
            distributed: true,
            dataLabels: {
                position: 'top',
            }
        },
    },
    dataLabels: {
        enabled: true,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        axisBorder: {
            show: false
        },
        labels: {
            show: false
        }
    },
    yaxis: {
        labels: { show: false }
    },
    grid: {
        yaxis: {
            lines: {
                show: false
            },
            labels: {
                show: false
            }
        },
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        enabled: true,
    },
    colors: [
        "#003d56", "#0074a3", "#737373"
    ],
    legend: {
        show: false,
    }
})

watch(props, () => {
    if (props.data.defects_count) {
        props.data.defects_count.forEach((el: string) => {
            const serie = [{ data: el }]
            series.value.push(serie as never)
        })
    }

    chartOptions.value = {
        ...chartOptions.value,
        xaxis: {
            categories: props.data.defects_names ??
                new ChartData({}).defects_names,
        },
    };
});
</script>

<style scoped>
.WheelsByShift_title {
    text-align: center;
    padding: 10px;
    font-size: var(--font-medium);
    color: var(--gray);
}

.flex {
    display: flex;
    align-items: center;
}

.char-container {
    display: flex;
}

img {
    width: 300px;
}

.chart-card {
    width: 30%;
}

.dot {
    background-color: gray;
    width: 10px;
    aspect-ratio: 1;
    border-radius: 1000000000px;
    margin-inline: auto;
    margin-bottom: 10px;
}

.full {
    width: 80%;
}

.dots-contaier {
    width: 100%;
    justify-content: center;
}

.dot-contaier {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px;
}

.A {
    background-color: #003d56;
}

.B {
    background-color: #0074a3;
}

.C {
    background-color: #737373;
}
</style>


