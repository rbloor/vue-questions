<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title>Take Quiz</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="ml-auto">{{ index + 1 }} of {{ questions.length }}</v-toolbar-title>
    </v-toolbar>
    <v-progress-linear v-model="progress" height="25" striped dark color="indigo">
      <strong>{{ progress }}%</strong>
    </v-progress-linear>
    <v-card-subtitle class="mb-0 pb-0">
      <h3 class="blockquote mb-0 pb-0">{{ question.name }}</h3>
    </v-card-subtitle>
    <v-simple-table class="blockquote">
      <tbody>
        <tr v-for="answer in question.answers" :key="answer.id">
          <td>
            <v-radio-group
              v-model="selected"
              :readonly="is_answered"
              v-if="question.type == 'single'"
              :success="!!isCorrectAnswer(answer)"
              :error="!!isWrongAnswer(answer)"
            >
              <v-radio :label="answer.name" :value="answer.id"></v-radio>
            </v-radio-group>
            <v-checkbox
              v-model="selected"
              :readonly="is_answered"
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
      <v-btn class="ma-2" color="primary" @click="prev()" v-if="index > 0">Prev</v-btn>
      <v-btn class="ma-2 ml-auto" color="primary" @click="next()" v-if="is_answered">Next</v-btn>
      <v-btn class="ma-2 ml-auto" color="primary" @click="mark()" v-if="!is_answered" :disabled="selected.length == 0">Mark</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "QuizStart",
  data() {
    return {
      index: 0,
      selected: [],
      is_answered: false
    }
  },
  computed: {
    ...mapState(["questions", "responses"]),
    question() {
      return this.questions[this.index]
    },
    progress() {
      return Math.ceil((this.index / this.questions.length) * 100)
    }
  },
  methods: {
    load() {
      let response = this.responses[this.index]
      if (response) {
        this.selected = response.answers
        this.is_answered = true
      } else {
        this.selected = []
        this.is_answered = false
      }
    },
    prev() {
      this.index--
    },
    next() {
      if (this.questions.length == this.index + 1) {
        this.$router.push({ name: "QuizResults" })
      }
      this.index++
    },
    mark() {
      this.is_answered = true

      let outcome = this.question.answers
        .filter((el) => {
          return el.is_correct
        })
        .every((el) => {
          return (
            (this.question.type == "single" && el.id === this.selected && el.is_correct) ||
            (this.question.type == "multiple" && this.selected.some((a) => a === el.id) && el.is_correct)
          )
        })

      this.responses[this.index] = { question: this.question, answers: this.selected, outcome: outcome }
      this.$store.dispatch("setResponses", this.responses)
    },
    isCorrectAnswer(answer) {
      return this.is_answered && answer.is_correct
    },
    isWrongAnswer(answer) {
      return (
        this.is_answered &&
        ((this.question.type == "multiple" && this.selected.some((el) => el === answer.id)) ||
          (this.question.type == "single" && this.selected === answer.id)) &&
        !answer.is_correct
      )
    }
  },
  watch: {
    index() {
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  beforeCreate() {}
}
</script>
