<template>
  <v-dialog v-model="dialog" max-width="600px" persistent @input="open">
    <template v-slot:activator="{ on }">
      <v-btn fab small v-on="on" color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form>
        <v-card-title class="pt-4 headline">Add category</v-card-title>
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
  name: "AddCategoryModal",
  data() {
    return {
      dialog: false,
      errors: [],
      form: {
        name: ""
      },
      default: {
        name: ""
      }
    };
  },
  methods: {
    open() {},
    close() {
      this.dialog = false;
      this.errors = [];
      this.form = Object.assign({}, this.default);
    },
    submit() {
      Category.create(this.form)
        .then(() => {
          this.$emit("add:item", this.form);
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
