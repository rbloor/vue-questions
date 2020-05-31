<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat dense>
            <v-toolbar-title>Practice</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-form>
              <v-select
                v-model="form.categories"
                :items="data.categories"
                item-text="name"
                item-value="id"
                label="Categories"
                multiple
                outlined
              ></v-select>
              <v-switch v-model="form.is_checked" class="ma-2" label="Checked by Consultant"></v-switch>
              <v-slider
                v-model="form.question_amount"
                :value="this.filtered.length"
                :max="this.filtered.length"
                :hint="this.filtered.length + ' available'"
                label="How many?"
                persistent-hint
                :thumb-size="20"
                thumb-label="always"
              ></v-slider>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block large color="primary" @click="submit" :disabled="this.filtered.slice(0, this.form.question_amount).length == 0">Start</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Category from "../apis/Category"
import Question from "../apis/Question"

export default {
  name: "Practice",
  data() {
    return {
      form: {
        categories: [],
        is_checked: null,
        question_amount: 0
      },
      data: {
        categories: [],
        questions: []
      },
      filtered: []
    }
  },
  computed: {},
  methods: {
    submit() {
      var router = this.$router
      this.$store.dispatch("setQuestions", this.filtered.slice(0, this.form.question_amount))
      router.push({
        name: "Quiz"
      })
    }
  },
  watch: {
    form: {
      handler() {
        this.filtered = this.data.questions
          .filter((el) => {
            return this.form.categories.length ? this.form.categories.includes(el.category_id) : true
          })
          .filter((el) => {
            return this.form.is_checked ? el.is_checked == this.form.is_checked : true
          })
      },
      deep: true
    }
  },
  mounted() {
    Category.all().then((response) => {
      this.data.categories = response.data.data
    })
    Question.all().then((response) => {
      this.data.questions = response.data.data
    })
  },
  beforeCreate() {
    this.$store.dispatch("removeQuestions")
    this.$store.dispatch("removeResponses")
  }
}
</script>
