<template>
  <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
    :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'HomeChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Object,
      default: () => { }
    },
    chartData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 30,
            bottom: 0
          }
        },
        scales: {
          xAxis: {
            display: true,
            grid: {
              display: false,
            },
          },
          yAxis: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled : false,
          },
          legend: {
            display: false,
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
          },
        }
      }
    }
  }
}
</script>