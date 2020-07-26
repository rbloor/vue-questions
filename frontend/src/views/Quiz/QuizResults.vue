<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title>Quiz Results</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="ml-auto">End</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <DoughnutChart :data="[wrong, correct]"></DoughnutChart>
          <h2 class="display-1 text-center">{{ percentage }}%</h2>
          <h3 class="text-center">You got {{ correct }} out of {{ total }}</h3>
        </v-col>
        <v-col class>
          <h2 class="h2">Areas you know well</h2>
          <v-list :flat="true" :disabled="true">
            <v-list-item-group v-for="(group, category) in groups" :key="category">
              <v-list-item v-if="filterCorrect(group) == group.length">
                <v-list-item-icon>
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="green--text" v-text="category"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="green--text" v-text="filterCorrect(group) + '/' + group.length"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col class>
          <h2 class="h2">Room for improvement</h2>
          <v-list :flat="true" :disabled="true">
            <v-list-item-group v-for="(group, category) in groups" :key="category">
              <v-list-item selected="true" v-if="filterCorrect(group) != group.length">
                <v-list-item-icon>
                  <v-icon color="red">mdi-cancel</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="red--text" v-text="category"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="red--text" v-text="filterCorrect(group) + '/' + group.length"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn class="ma-2 ml-auto" color="primary" @click="finish()">Finish</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex"
import DoughnutChart from "@/components/DoughnutChart"
export default {
  name: "QuizResults",
  components: {
    DoughnutChart
  },
  data() {
    return {
      progress: 100,

      goodGroups: [],
      badGroups: []
    }
  },
  computed: {
    ...mapState(["questions", "responses"]),
    correct() {
      return this.filterCorrect(this.responses)
    },
    wrong() {
      return this.filterWrong(this.responses)
    },
    total() {
      return this.responses.length
    },
    percentage() {
      return Math.round((this.correct / this.total) * 100)
    },
    groups() {
      return this.responses.reduce((result, currentValue) => {
        result[currentValue.question.category_id] = [...(result[currentValue.question.category_id] || []), currentValue]
        return result
      }, {})
    }
  },
  methods: {
    filterCorrect(array) {
      return array.filter((elem) => {
        return elem.outcome
      }).length
    },
    filterWrong(array) {
      return array.filter((elem) => {
        return !elem.outcome
      }).length
    },
    finish() {
      this.$router.push({ name: "Dashboard" })
    }
  },
  watch: {},
  mounted() {},
  beforeCreate() {}
}
</script>
