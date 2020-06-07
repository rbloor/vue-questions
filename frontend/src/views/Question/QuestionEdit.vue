<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Edit question</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn fab dark small color="primary" :to="{ name: 'QuestionList' }">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form>
      <v-card-text>
        <v-textarea
          v-model="form.name"
          label="Name"
          :error-messages="errors.name"
          auto-grow
          outlined
        ></v-textarea>
        <v-text-field v-model="form.source" label="Source" :error-messages="errors.source" outlined></v-text-field>
        <v-combobox v-model="form.type" :items="['single', 'multiple']" label="Type" outlined></v-combobox>
        <v-select
          v-model="form.category_id"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Category"
          outlined
        ></v-select>
        <v-switch v-model="form.is_checked" class="ma-2" label="Checked by Consultant"></v-switch>
        <v-data-table :headers="headers" :items="form.answers" hide-default-footer>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Answers</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <add-answer-modal v-on:add:item="answerAdded($event)"></add-answer-modal>
            </v-toolbar>
          </template>
          <template v-slot:item.is_correct="{ item }">
            <v-simple-checkbox :value="item.is_correct" disabled></v-simple-checkbox>
          </template>
          <template v-slot:item.actions="{ item }">
            <edit-answer-modal :item="item" v-on:edit:item="answerUpdated($event, item)"></edit-answer-modal>
            <v-btn class="ml-2 red" fab x-small dark @click="answerDeleted(item)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit" color="blue darken-1" dark large outlined>Save</v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import Question from "@/apis/Question";
import Category from "@/apis/Category";
import Answer from "@/apis/Answer";
import AddAnswerModal from "@/components/modals/AddAnswerModal";
import EditAnswerModal from "@/components/modals/EditAnswerModal";
export default {
  name: "QuestionEdit",
  components: {
    AddAnswerModal,
    EditAnswerModal
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      errors: [],
      form: {
        id: "",
        name: "",
        source: "",
        type: "",
        is_checked: "",
        category_id: "",
        user_id: ""
      },
      headers: [
        { text: "Answer", align: "start", value: "name" },
        { text: "Notes", value: "notes" },
        { text: "Correct", value: "is_correct" },
        { text: "Actions", value: "actions" }
      ],
      categories: []
    };
  },
  created() {
    Question.find(this.id).then(response => {
      this.form = response.data.data;
    });
    Category.all().then(response => {
      this.categories = response.data.data;
    });
  },
  methods: {
    submit() {
      Question.update(this.form.id, this.form)
        .then(() => {
          this.errors = [];
          this.$emit("edit:item", this.form);
          this.$router.push({ name: "QuestionList" });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    answerAdded(answer) {
      this.form.answers.push(answer);
      this.$emit("add:item");
    },
    answerUpdated(answer, oldAnswer) {
      let index = this.form.answers.indexOf(oldAnswer);
      Object.assign(this.form.answers[index], answer);
      this.$emit("edit:item");
    },
    answerDeleted(answer) {
      const index = this.form.answers.indexOf(answer);
      confirm("Are you sure you want to delete this item?") &&
        Answer.delete(answer.id).then(() => {
          this.form.answers.splice(index, 1);
        });
    }
  }
};
</script>
