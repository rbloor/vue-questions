<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat dense>
            <v-toolbar-title>Practice > Quiz</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="ml-auto">{{ parseInt(this.questionIndex + 1) + " of " + this.questions.length }}</v-toolbar-title>
          </v-toolbar>
          <v-progress-linear v-model="percentCompletion" height="25" striped dark color="indigo">
            <strong>{{ percentCompletion }}%</strong>
          </v-progress-linear>
          <v-card-subtitle>
            <h3 class="title black--text">
              {{ question.name }}
            </h3>
          </v-card-subtitle>
          <v-simple-table>
            <tbody>
              <tr v-for="answer in question.answers" :key="answer.id">
                <td>
                  <v-radio-group
                    v-model="selected"
                    :readonly="!gameActive"
                    v-if="question.type == 'single'"
                    :success="!!isCorrectAnswer(answer)"
                    :error="!!isWrongAnswer(answer)"
                  >
                    <v-radio :label="answer.name" :value="answer.id"></v-radio>
                  </v-radio-group>
                  <v-checkbox
                    v-model="selected"
                    :readonly="!gameActive"
                    :label="answer.name"
                    :value="answer.id"
                    v-if="question.type == 'multiple'"
                    :success="!!isCorrectAnswer(answer)"
                    :error="!!isWrongAnswer(answer)"
                  ></v-checkbox>
                </td>
                <td>
                  <span class="pa-2 green" v-if="!!isCorrectAnswer(answer)">
                    <v-icon dark>mdi-check</v-icon>
                  </span>
                  <span class="pa-2 red" v-if="!!isWrongAnswer(answer)">
                    <v-icon dark>mdi-close</v-icon>
                  </span>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-card-actions>
            <v-btn class="ma-2" color="primary" @click="prev()" v-if="questionIndex > 0">Prev</v-btn>
            <v-btn class="ma-2 ml-auto" color="primary" @click="next()" v-if="!gameActive">Next</v-btn>
            <v-btn class="ma-2 ml-auto" color="primary" @click="mark()" v-if="gameActive" :disabled="!gameActive">Mark</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "Quiz",
  data() {
    return {
      questionIndex: 0,
      selected: [],
      gameActive: true
    }
  },
  computed: {
    ...mapState(["questions", "responses"]),
    percentCompletion: function() {
      return Math.ceil((this.questionIndex / this.questions.length) * 100)
    },
    question: function() {
      return this.questions[this.questionIndex]
    }
  },

  methods: {
    loadUserResponse() {
      let response = this.responses[this.questionIndex]
      if (response) {
        this.selected = response.answered_ids
        this.gameActive = false
      } else {
        this.gameActive = true
        this.selected = []
      }
    },

    mark() {
      this.gameActive = false
      this.responses[this.questionIndex] = {
        question_id: this.question.id,
        answered_ids: this.selected
      }
      this.$store.dispatch("setResponses", this.responses)
    },

    prev() {
      this.questionIndex--
      this.loadUserResponse()
    },

    next() {
      if (this.questions.length == this.questionIndex + 1) {
        var router = this.$router
        router.push({
          name: "Results"
        })
      }
      this.questionIndex++
      this.loadUserResponse()
    },

    isCorrectAnswer(answer) {
      return !this.gameActive && answer.is_correct
    },

    isWrongAnswer(answer) {
      return (
        !this.gameActive &&
        ((this.question.type == "multiple" && this.selected.some((el) => el === answer.id)) ||
          (this.question.type == "single" && this.selected === answer.id)) &&
        !answer.is_correct
      )
    }
  },
  mounted() {
    this.loadUserResponse()
  }
}
</script>
