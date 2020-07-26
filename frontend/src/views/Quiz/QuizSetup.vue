<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary light" dark dense>
      <v-toolbar-title>Quiz Introduction</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-select v-model="form.categories" :items="categories" item-text="name" item-value="id" label="Categories" multiple outlined></v-select>
        <v-row>
          <v-col cols="auto">
            <v-switch v-model="form.is_checked" class="ma-2" label="Checked by a Consultant"></v-switch>
          </v-col>
          <v-col cols="auto">
            <v-switch v-model="form.is_answered" class="ma-2" label="Answered I have previously"></v-switch>
          </v-col>
          <v-col cols="auto">
            <v-switch v-model="form.is_author" class="ma-2" label="Questions created by me"></v-switch>
          </v-col>
        </v-row>
        <v-slider
          v-if="this.filtered_questions.length"
          v-model="form.question_limit"
          :value="this.filtered_questions.length"
          :max="this.filtered_questions.length"
          :hint="this.filtered_questions.length + ' available'"
          label="How many?"
          persistent-hint
          :thumb-size="20"
          thumb-label="always"
        ></v-slider>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block large color="primary" @click="submit" :disabled="this.filtered_questions.slice(0, this.form.question_limit).length == 0"
        >Start</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import Category from "@/apis/Category"
import Question from "@/apis/Question"
export default {
  name: "QuizSetup",
  data() {
    return {
      categories: [],
      questions: [],
      filtered_questions: [],
      form: {
        categories: [],
        is_checked: 0,
        is_answered: 0,
        is_author: 0,
        question_limit: 0
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("setQuestions", this.filtered_questions.slice(0, this.form.question_limit))
      this.$router.push({ name: "QuizStart" })
    }
  },
  watch: {
    form: {
      handler() {
        this.filtered_questions = this.questions
          .filter((el) => {
            return this.form.categories.length ? this.form.categories.includes(el.category_id) : true
          })
          .filter((el) => {
            return this.form.is_checked ? el.is_checked == this.form.is_checked : true
          })
        // filter is_author and is_answered
      },
      deep: true
    }
  },
  mounted() {
    Category.all().then((response) => {
      this.categories = response.data.data
    })
    Question.all().then((response) => {
      this.filtered_questions = response.data.data
      this.questions = response.data.data
    })
  },
  beforeCreate() {
    this.$store.dispatch("removeQuestions")
    this.$store.dispatch("removeResponses")
  }
}
</script>
