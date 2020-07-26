<script>
import { Pie } from "vue-chartjs"

export default {
  extends: Pie,
  props: ["data"],
  data() {
    return {
      chartData: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            backgroundColor: ["#249EBF", "#f87979"],
            data: this.data
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 20
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
