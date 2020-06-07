<template>
  <v-dialog v-model="dialog" max-width="600px" persistent @input="open">
    <template v-slot:activator="{ on }">
      <v-btn class="ml-2 primary" fab x-small dark v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form>
        <v-card-title class="pt-4 headline">Edit category</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Name" :error-messages="errors.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="blue darken-1" text>Close</v-btn>
          <v-btn @click="submit" color="blue darken-1" text>Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Category from "../../apis/Category";
export default {
  name: "EditCategoryModal",
  props: ["item"],
  data() {
    return {
      dialog: false,
      errors: [],
      form: {
        id: "",
        name: ""
      },
      default: {
        id: "",
        name: ""
      }
    };
  },
  methods: {
    open() {
      this.form = Object.assign({}, this.item);
    },
    close() {
      this.dialog = false;
      this.errors = [];
      this.form = Object.assign({}, this.default);
    },
    submit() {
      Category.update(this.form.id, this.form)
        .then(() => {
          this.$emit("edit:item", this.form);
          this.close();
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>
