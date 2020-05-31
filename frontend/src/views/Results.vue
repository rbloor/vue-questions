<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat dense>
            <v-toolbar-title>Practice > Quiz > Results</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="ml-auto">{{ this.questions.length + " of " + this.questions.length }}</v-toolbar-title>
          </v-toolbar>
          <v-progress-linear v-model="percentCompletion" height="25" striped dark color="indigo">
            <strong>{{ percentCompletion }}%</strong>
          </v-progress-linear>

          <v-row>
            <v-col cols="12" sm="12" md="6">
              <DoughnutChart :chart-data="chartData" :chart-options="chartOptions"></DoughnutChart>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <BarChart :chart-data="barchartData"></BarChart>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import DoughnutChart from "../components/DoughnutChart"
import BarChart from "../components/BarChart"

export default {
  name: "Results",
  components: {
    DoughnutChart: DoughnutChart,
    BarChart: BarChart
  },
  data() {
    return {
      percentCompletion: 100,
      chartData: {
        labels: ["Incorrects Answers", "Correct Answers"],
        datasets: [
          {
            backgroundColor: ["#249EBF", "#f87979"],
            data: [4, 8]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      barchartData: {
        labels: ["Incorrects Answers", "Correct Answers"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#249EBF",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#f87979",
            //Data to be represented on y-axis
            data: [4, 8]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(["questions", "responses"])
  },

  methods: {}
}
</script>
