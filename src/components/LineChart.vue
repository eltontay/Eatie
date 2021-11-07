<script>
import { Line } from 'vue3-chart-v2'

export default {
  extends: Line,  
  props:  {
    chartData: {
      type: Object,
      default: null
    },
    maxWeight: {
      type: Number,
      required: false
    },
    minWeight: {
      type: Number,
      required: false
    },
  },
  data() {
    return {
      chartOptions: {
          responsive: true,
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                min: this.minWeight,
                max: this.maxWeight
              }
            }],
          }
        }}
  },
  mounted () {
    console.log(this.chartData)
    console.log(this.chartOptions)
    this.renderChart(this.chartData, this.chartOptions)
  }
} 

</script>