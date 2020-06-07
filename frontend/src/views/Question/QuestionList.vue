<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      show-expand
      :expanded.sync="expanded"
      :single-expand="true"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Question List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            clearable
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn fab dark small color="primary" :to="{ name: 'QuestionAdd' }">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td class="pa-4" :colspan="headers.length">
          <blockquote class="blockquote pb-0">{{ item.name }}</blockquote>
          <v-row class="px-4 pb-2">
            <v-col cols="12" sm="6" md="4" v-for="answer in item.answers" :key="answer.id">
              <v-radio-group :readonly="true" v-if="item.type === 'single'" hide-details disabled>
                <v-radio :label="answer.name"></v-radio>
              </v-radio-group>
              <v-checkbox
                :label="answer.name"
                :value="answer.id"
                v-if="item.type == 'multiple'"
                hide-details
                disabled
              ></v-checkbox>
            </v-col>
          </v-row>
        </td>
      </template>
      <template v-slot:item.is_checked="{ item }">
        <v-simple-checkbox :value="item.is_checked" disabled></v-simple-checkbox>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="ml-2 primary"
          fab
          x-small
          dark
          :to="{ name: 'QuestionEdit', params: { id: item.id }}"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn class="ml-2 red" fab x-small dark @click="deleteItem(item)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Question from "@/apis/Question";
export default {
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Question", align: "start", value: "short_name" },
        { text: "Type", value: "type" },
        { text: "Checked", value: "is_checked" },
        { text: "Actions", sortable: false, filerable: false, value: "actions" }
      ],
      items: [],
      search: "",
      expanded: []
    };
  },
  methods: {
    getQuestions() {
      Question.all().then(response => {
        this.items = response.data.data;
      });
    },
    addItem(item) {
      this.items.push(item);
    },
    editItem(index, item) {
      Object.assign(this.items[index], item);
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        Question.delete(item.id).then(() => {
          this.items.splice(index, 1);
        });
    }
  },
  mounted() {
    this.getQuestions();
  }
};
</script>
