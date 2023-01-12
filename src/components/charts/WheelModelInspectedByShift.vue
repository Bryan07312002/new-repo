<template>
    <div>
        <p class="chart_title">Modelo de Rodas Inspecionadas por Turno de Trabalho</p>
        <div class="flex">
            <div>
                <VueApexCharts type="bar" height="350" :options="chartOptions_1" :series="series_1"></VueApexCharts>
            </div>
            <div>
                <VueApexCharts type="bar" height="350" :options="chartOptions_2" :series="series_2"></VueApexCharts>
            </div>
            <div>
                <VueApexCharts type="bar" height="350" :options="chartOptions_2" :series="series_3"></VueApexCharts>
            </div>  
        </div>
    </div>
</template>

<style scoped>
    .flex {
        display: flex;
    }
    .flex > div{
        width: 33.333333333333%;
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
    import { ref } from 'vue'

    const series_1 = ref([
        {
            name: 'defeituosas',
            data: [11, 17, 11, 15, 21, 14]
        },
        {
            name: 'Inspecionadas',
            data: [21, 7, 25, 13, 22, 8]
        }
    ])
    const series_2 = ref([
        {
            name: 'defeituosas',
            data: [11, 17, 15, 15, 21, 14]
        },
        {
            name: 'Inspecionadas',
            data: [21, 7, 25, 13, 22, 8]
        }
    ])
    const series_3 = ref([
        {
            name: 'defeituosas',
            data: [11, 17, 15, 15, 21, 14]
        },
        {
            name: 'Inspecionadas',
            data: [21, 7, 25, 13, 22, 8]
        }
    ])

    const chartOptions_1 = ref({
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom:{
                eneable: false
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
              horizontal: false,
            },
        },
        xaxis: {
            categories: [],
            axisBorder:{
                show: false
            },
            labels:{
                style: {
                    colors: ['#737373','#737373','#737373','#737373','#737373','#737373',]
                }
            }
        },
        yaxis:{
            show: true
        },
        legend: {
            show: false
        },
        fill: {
            opacity: 1
        },
        colors:[
            '#FF4646',
            "#003D56"
        ],
        grid:{
            yaxis: {lines:{show:true}},
            xaxis: {lines:{show:false}}
        }
    })

    const chartOptions_2 = ref({
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom:{
                eneable: false
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
              horizontal: false,
            },
        },
        xaxis: {
            categories: [],
            axisBorder:{
                show: false
            },
            labels:{
                style: {
                    colors: ['#737373','#737373','#737373','#737373','#737373','#737373',]
                }
            }
        },
        yaxis:{
            show: false
        },
        legend: {
            show: false
        },
        fill: {
            opacity: 1
        },
        colors:[
            '#FF4646',
            "#003D56"
        ],
        grid:{
            yaxis: {lines:{show:true}},
            xaxis: {lines:{show:false}}
        }
    })
</script>
