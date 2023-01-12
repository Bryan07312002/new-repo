<template>
    <div 
        class="chart_title fix-chart-index"
    >
        <p>Top 5 Defeitos Encontrados nos Três Turnos</p>
        <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"></VueApexCharts>
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

<script setup>
    import VueApexCharts from "vue3-apexcharts";
    import { ref } from "vue"

    const props = defineProps({
        defects_name: {
            type: Array,
            default: ['A', 'B', 'C']
        },
        defects_number: {
            type: Array,
            default: [1, 2, 3]
        }
    })

    const series = ref([
        {
            name: '1 turno',
            data: [44, 55, 41]
        },
        {
            name: '2 turno',
            data: [53, 32, 33]
        },
        {
            name: '3 turno',
            data: [12, 17, 11]
        }
    ])

    const chartOptions = ref(
        {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar:{
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            xaxis: {
                categories: ['defect x', 'defect y', 'defect z'],
                labels: {
                    show:false,
                    
                },
                axisBorder:{
                    show:false
                }
            },
            yaxis:{
                labels: {
                   style: {
                        fontSize:'1rem'
                    }, 
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "K"
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize:'16px',
                itemMargin: {
                    horizontal:20
                }
            },
            grid:{
                yaxis:{lines:{show:false}},
                xaxis: {lines:{show:false}}
            },
            colors: ['#003D56', '#0074A3','#737373']
        }
    )
</script>
